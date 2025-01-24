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
    const post = await PostModel.findOne(
      { _id: id, is_deleted: false },
      { __v: 0, is_deleted: 0, deleted_at: 0 }
    );
    if (!post) {
      throw new CustomError("Post not found", 404);
    }

    return post;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (limit: number, page: number) => {
  try {
    const posts = await PostModel.find(
      { is_deleted: false },
      { __v: 0, is_deleted: 0, deleted_at: 0 }
    )
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    await PostModel.populate(posts, {
      path: "user_id",
      select: "username profilePictureLink _id",
    });

    const transformedPosts = posts.map((post) => ({
      ...post.toObject(),
      user:
        typeof post.user_id === "object"
          ? {
              username: post.user_id.username,
              profilePictureLink:
                post.user_id.profilePictureLink ??
                `${process.env.AWS_S3_BUCKET_LINK}/default-avatar.webp`,
            }
          : { username: "", profilePictureLink: "" },
      user_id:
        typeof post.user_id === "object" ? post.user_id._id : post.user_id,
    }));

    return transformedPosts;
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
    const posts = await PostModel.find(
      { user_id, is_deleted: false },
      { __v: 0, is_deleted: 0, deleted_at: 0 }
    )
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return posts;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: string, user_id: string) => {
  try {
    const post = await PostModel.findOneAndUpdate(
      { _id: id, user_id, is_deleted: false },
      { is_deleted: true, deleted_at: new Date() },
      { new: true }
    );
    if (!post) {
      throw new CustomError("Post not found", 404);
    }

    return post;
  } catch (error) {
    throw error;
  }
};
