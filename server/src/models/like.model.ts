import { Document, Model, model, Schema, ObjectId } from "mongoose";

export interface ILike {
  user: {
    _id: string | ObjectId;
    username?: string;
    profilePictureLink?: string;
  };
  post_id: string | ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILikeDocument extends ILike, Document {}

export const LikeSchema = new Schema<ILikeDocument>({
  user: {
    _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String },
    profilePictureLink: { type: String },
  },
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const LikeModel: Model<ILikeDocument> = model<ILikeDocument>(
  "Like",
  LikeSchema
);

export default LikeModel;
