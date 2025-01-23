import { Document, Model, model, Schema } from "mongoose";

export interface IPost {
  user_id: string;
  content: string;
  imageLink?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_deleted: boolean;
  likeNumber: number;
  commentNumber: number;
  shareNumber: number;
}

export interface IPostDocument extends IPost, Document {}

export const PostSchema = new Schema<IPostDocument>({
  user_id: { type: Schema.Types.String, ref: "User" },
  content: { type: String, required: true },
  imageLink: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date },
  is_deleted: { type: Boolean, default: false },
  likeNumber: { type: Number, default: 0 },
  commentNumber: { type: Number, default: 0 },
  shareNumber: { type: Number, default: 0 },
});

const PostModel: Model<IPostDocument> = model<IPostDocument>(
  "Post",
  PostSchema
);

export default PostModel;
