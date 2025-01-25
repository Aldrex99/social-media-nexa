import LikeModel, { ILike } from "@models/like.model";

export const addLike = async (data: Partial<ILike>) => {
  try {
    const like = new LikeModel(data);
    await like.save();

    return like;
  } catch (error) {
    throw error;
  }
};

export const getLikes = async (
  post_id: string,
  limit: number,
  page: number
) => {
  try {
    const likes = await LikeModel.find({ post_id }, { __v: 0 })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "user",
        select: "username profilePictureLink _id",
      });

    const updatedLikes = await Promise.all(
      likes.map(async (like) => {
        if (!like.user.profilePictureLink) {
          like.user.profilePictureLink = `${process.env.AWS_S3_BUCKET_LINK}/default-avatar.webp`;
        }

        return like;
      })
    );

    return updatedLikes;
  } catch (error) {
    throw error;
  }
};

export const removeLike = async (post_id: string, user_id: string) => {
  try {
    const like = await LikeModel.findOneAndDelete({
      post_id,
      user: user_id,
    });

    return like;
  } catch (error) {
    throw error;
  }
};

export const countLikes = async (post_id: string) => {
  try {
    const likesCount = await LikeModel.countDocuments({ post_id });

    return likesCount;
  } catch (error) {
    throw error;
  }
};

export const checkUserLiked = async (post_id: string, user_id: string) => {
  try {
    const like = await LikeModel.countDocuments({
      post_id,
      user: user_id,
    });

    return like > 0;
  } catch (error) {
    throw error;
  }
};
