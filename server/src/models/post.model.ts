import { Document, Model, model, Schema, ObjectId } from "mongoose";

export interface IPost {
  user: {
    _id: string | ObjectId;
    username?: string;
    profilePictureLink?: string;
  };
  content: string;
  imageLink?: string;
  likesCount?: number;
  commentsCount?: number;
  userLiked?: boolean;
  userCommented?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostDocument extends IPost, Document {}

export const PostSchema = new Schema<IPostDocument>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  imageLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PostModel: Model<IPostDocument> = model<IPostDocument>(
  "Post",
  PostSchema
);

export default PostModel;
