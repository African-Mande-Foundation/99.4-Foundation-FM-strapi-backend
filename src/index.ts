import type { Core } from "@strapi/strapi";

export default {
  register() {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const onNewsletterDispatch = async ({
      id,
      reason,
    }: {
      id: string;
      reason?: string;
    }) => {
      try {
        // ✅ Run queries outside of any lifecycle transaction
        const knex = strapi.db.connection;

        // Manually fetch newsletter
        const [newsletter] = await knex("newsletters").where({ id }).limit(1);
        if (!newsletter) {
          strapi.log.warn(`Newsletter with ID ${id} not found`);
          return;
        }

        // Fetch subscribers
        const signups = await knex("newsletter_signups").select("email");
        const subscribers = signups.filter((s) => !!s.email);
        if (subscribers.length === 0) {
          strapi.log.info("No subscribers found.");
          return;
        }
        console.log(subscribers.length)
        // Fetch articles
        const articles = await knex("articles")
          .orderBy("created_at", "desc")
          .limit(5);

        // Send emails asynchronously
        setImmediate(async () => {
          try {
            await strapi
              .service("api::newsletter.newsletter")
              .sendEmails({ newsletter, subscribers, articles, reason });

            strapi.log.info(
              `✅ Newsletter ${id} sent (trigger: ${reason || "unknown"})`,
            );
          } catch (err) {
            strapi.log.error(
              "❌ Newsletter send failed in eventHub listener:",
              err,
            );
          }
        });
      } catch (err) {
        strapi.log.error("❌ Error in onNewsletterDispatch:", err);
      }
    };

    strapi.eventHub.on("newsletter.dispatch", onNewsletterDispatch);
    strapi.log.info("✅ eventHub listener registered: newsletter.dispatch");
  },
};
