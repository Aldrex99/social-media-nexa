import CommentModel, { IComment } from "@models/comment.model";

export const createComment = async (data: Partial<IComment>) => {
  try {
    const comment = new CommentModel(data);
    await comment.save();

    return comment;
  } catch (error) {
    throw error;
  }
};

export const getComments = async (
  post_id: string,
  limit: number,
  page: number
) => {
  try {
    const comments = await CommentModel.find({ post_id }, { __v: 0 })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "user",
        select: "username profilePictureLink _id",
      });

    const updatedComments = await Promise.all(
      comments.map(async (comment) => {
        if (!comment.user.profilePictureLink) {
          comment.user.profilePictureLink = `${process.env.AWS_S3_BUCKET_LINK}/default-avatar.webp`;
        }

        return comment;
      })
    );

    return updatedComments;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (comment_id: string, user_id: string) => {
  try {
    const comment = await CommentModel.findOneAndDelete({
      _id: comment_id,
      user: user_id,
    });

    return comment;
  } catch (error) {
    throw error;
  }
};

export const countComments = async (post_id: string) => {
  try {
    const commentsCount = await CommentModel.countDocuments({ post_id });

    return commentsCount;
  } catch (error) {
    throw error;
  }
};

export const checkUserCommented = async (post_id: string, user_id: string) => {
  try {
    const comment = await CommentModel.countDocuments({
      post_id,
      user: user_id,
    });

    return comment > 0;
  } catch (error) {
    throw error;
  }
};
