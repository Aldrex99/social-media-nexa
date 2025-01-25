import { CustomError } from "@/utils/customError.util";
import PostModel, { IPost } from "@models/post.model";

export const createPost = async (data: Partial<IPost>) => {
  try {
    const post = new PostModel(data);
    await post.save();

    return post;
  } catch (error) {
    throw error;
  }
};

export const getPost = async (id: string) => {
  try {
    const post = await PostModel.findOne({ _id: id }, { __v: 0 }).populate({
      path: "user",
      select: "username profilePictureLink _id",
    });

    if (!post) {
      throw new CustomError("Post not found", 404);
    }

    if (!post.user.profilePictureLink) {
      post.user.profilePictureLink = `${process.env.AWS_S3_BUCKET_LINK}/default-avatar.webp`;
    }

    return post;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (limit: number, page: number) => {
  try {
    const posts = await PostModel.find({}, { __v: 0 })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "user",
        select: "username profilePictureLink _id",
      });

    posts.forEach((post) => {
      if (!post.user.profilePictureLink) {
        post.user.profilePictureLink = `${process.env.AWS_S3_BUCKET_LINK}/default-avatar.webp`;
      }
    });

    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPostsByUser = async (
  user_id: string,
  limit: number,
  page: number
) => {
  try {
    const posts = await PostModel.find({ user: user_id }, { __v: 0 })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "user",
        select: "username profilePictureLink _id",
      });

    posts.forEach((post) => {
      if (!post.user.profilePictureLink) {
        post.user.profilePictureLink = `${process.env.AWS_S3_BUCKET_LINK}/default-avatar.webp`;
      }
    });

    return posts;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: string, user_id: string) => {
  try {
    const post = await PostModel.findOneAndDelete({
      _id: id,
      user: user_id,
    });
    if (!post) {
      throw new CustomError("Post not found", 404);
    }

    return post;
  } catch (error) {
    throw error;
  }
};
