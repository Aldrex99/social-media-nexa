import { Document, Model, model, Schema } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  role: string;
  password?: string;
  reset_password_token?: string;
  profilePictureLink?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserDocument extends IUser, Document {}

export const UserSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  reset_password_token: { type: String },
  profilePictureLink: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserModel: Model<IUserDocument> = model<IUserDocument>(
  "User",
  UserSchema
);

export default UserModel;
