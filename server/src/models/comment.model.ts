import { Document, Model, model, Schema, ObjectId } from "mongoose";

export interface IComment {
  user: {
    _id: string | ObjectId;
    username?: string;
    profilePictureLink?: string;
  };
  post_id: string | ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDocument extends IComment, Document {}

export const CommentSchema = new Schema<ICommentDocument>({
  user: {
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String },
    profilePictureLink: { type: String },
  },
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CommentModel: Model<ICommentDocument> = model<ICommentDocument>(
  "Comment",
  CommentSchema
);

export default CommentModel;
