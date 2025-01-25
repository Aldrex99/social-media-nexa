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

    return likes;
  } catch (error) {
    throw error;
  }
};

export const removeLike = async (data: Partial<ILike>) => {
  try {
    const like = await LikeModel.findOneAndDelete(data);

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
    const like = await LikeModel.countDocuments({ post_id, user: user_id });

    return like > 0;
  } catch (error) {
    throw error;
  }
};
