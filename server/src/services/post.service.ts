import PostModel, { IPost } from "../models/post.model";

export const createPost = async (data: Partial<IPost>) => {
  try {
    const post = new PostModel(data);
    await post.save();
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
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (limit: number, page: number) => {
  try {
    const posts = await PostModel.find(
      { is_deleted: false, is_archived: false },
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
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    throw error;
  }
};