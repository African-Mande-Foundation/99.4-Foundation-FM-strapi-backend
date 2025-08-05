interface Comment {
  id: number;
  parent?: {
    id: number;
  };
}

// Utility function to update the repliesCount of a parent comment
const updateParentRepliesCount = async (parentId: number) => {
  if (!parentId) return;

  try {
    // Count the number of replies to this parent
    const repliesCount = await strapi.db.query('api::comment.comment').count({
      where: {
        parent: parentId,
      },
    });

    // Update the parent comment's repliesCount field
    await strapi.db.query('api::comment.comment').update({
      where: { id: parentId },
      data: { repliesCount },
    });
  } catch (err) {
    console.error(`❌ Failed to update repliesCount for parent ID ${parentId}:`, err);
  }
};

export default {
  // Triggered after a comment is created
  async afterCreate(event: { result: Comment }) {
    const { result } = event;

    // Fetch the parent ID (safely)
    const comment = await strapi.db.query('api::comment.comment').findOne({
      where: { id: result.id },
      populate: { parent: true },
    });

    if (comment?.parent?.id) {
      await updateParentRepliesCount(comment.parent.id);
    }
  },

  // Triggered after a comment is updated
  async afterUpdate(event: { result: Comment }) {
    const { result } = event;

    const comment = await strapi.db.query('api::comment.comment').findOne({
      where: { id: result.id },
      populate: { parent: true },
    });

    if (comment?.parent?.id) {
      await updateParentRepliesCount(comment.parent.id);
    }
  },

  // Triggered after a comment is deleted
  async afterDelete(event: { result: Comment }) {
    const { result } = event;

    if (result?.parent?.id) {
      await updateParentRepliesCount(result.parent.id);
    }
  },

  // Triggered after many comments are deleted at once
  async afterDeleteMany(event: { result: Comment[] }) {

    const uniqueParentIds = new Set<number>();

    for (const deletedComment of event.result) {
      if (deletedComment?.parent?.id) {
        uniqueParentIds.add(deletedComment.parent.id);
      }
    }

    for (const parentId of uniqueParentIds) {
      await updateParentRepliesCount(parentId);
    }
  },
};
