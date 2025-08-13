import crypto from "crypto";

export default {
  async afterCreate(event) {
    const { result } = event;

    // 1. Get all newsletter signup entries (with email)
    const signups = await strapi.db
      .query("api::newsletter-signup.newsletter-signup")
      .findMany({
        select: ["email"],
      });

    const subscribers = signups.filter((s) => !!s.email);

    if (subscribers.length === 0) return;

    // 2. Fetch latest 5 articles
    const articles = await strapi.db.query("api::article.article").findMany({
      orderBy: { createdAt: "desc" },
      limit: 5,
      populate: { author: true },
    });

    const subject = result.Title || "New Newsletter";
    // CKEditor HTML content
    const contentHtml = result.content || "<p>Check out our latest update!</p>";

    // 3. Prepare HTML for articles
    const articlesHtml = articles
      .map((article) => {
        const authorName = article.author?.name || "Unknown Author";
        return `
          <li style="margin-bottom: 10px;">
            <a href="${process.env.FRONTEND_URL}/news/${article.id}" style="color: #00bcd4; text-decoration: none; font-weight: bold;">
              ${article.title}
            </a>
            <div style="font-size: 12px; color: #555;">by ${authorName}</div>
          </li>
        `;
      })
      .join("");

    // 4. Send email to each subscriber
    const emailPromises = subscribers.map((subscriber) => {
      const unsubscribeToken = crypto
        .createHash("sha256")
        .update(`${subscriber.email}${process.env.UNSUBSCRIBE_SECRET}`)
        .digest("hex");

      const unsubscribeLink = `${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}&token=${unsubscribeToken}`;

      const html = `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">

          <!-- Header Row -->
          <div style="display: flex; align-items: center; border-bottom: 2px solid #00bcd4; padding-bottom: 10px; margin-bottom: 20px;">
            <img src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2FIMG-20220323-WA0012.jpg?alt=media&token=181d64fc-c649-495a-95a9-1ff82a7643ee"
                 alt="FoundationFM Logo"
                 style="height: 50px; margin-right: 10px;" />
            <h2 style="margin: 0; color: #00bcd4; font-weight: bold;">FoundationFM</h2>
          </div>

          <!-- Newsletter Title -->
          <h1 style="color: #00bcd4; font-size: 22px; margin-bottom: 15px;">${subject}</h1>

          <!-- CKEditor HTML Content -->
          <div style="color: #444; font-size: 15px; line-height: 1.6;">
            ${contentHtml}
          </div>

          <!-- Latest Articles Section -->
          <h3 style="margin-top: 25px; color: #00bcd4;">Latest Articles</h3>
          <ul style="padding-left: 20px; color: #333; list-style: disc;">
            ${articlesHtml}
          </ul>

          <!-- Unsubscribe -->
          <div style="margin-top: 25px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
            If you wish to stop receiving our emails, click
            <a href="${unsubscribeLink}" style="color: red;">here to unsubscribe</a>.
          </div>
        </div>
      `;

      return strapi.plugins["email"].services.email.send({
        to: subscriber.email,
        subject,
        html,
      });
    });

    try {
      await Promise.all(emailPromises);
    } catch (err) {
      console.error("Error sending newsletter emails:", err);
    }
  },
};
