/**
 * comment controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::comment.comment",
  ({ strapi }) => ({
    async find(ctx) {
      const userId = ctx.state.user?.id;

      // Run the default core controller
      const { data, meta } = await super.find(ctx);

      const enriched = await Promise.all(
        data.map(async (comment) => {
          const commentId = comment.id;

          // Count likes and dislikes
          const [likesCount, dislikesCount] = await Promise.all([
            strapi.db.query("api::comment-reaction.comment-reaction").count({
              where: { comment: commentId, type: "like" },
            }),
            strapi.db.query("api::comment-reaction.comment-reaction").count({
              where: { comment: commentId, type: "dislike" },
            }),
          ]);

          // Current user reaction
          let currentUserReaction = null;
          if (userId) {
            const reaction = await strapi.db
              .query("api::comment-reaction.comment-reaction")
              .findOne({
                where: { comment: commentId, user: userId },
              });
            currentUserReaction = reaction?.type || null;
          }

          return {
            ...comment,
            likesCount,
            dislikesCount,
            currentUserReaction,
          };
        }),
      );

      return { data: enriched, meta };
    },
  }),
);
