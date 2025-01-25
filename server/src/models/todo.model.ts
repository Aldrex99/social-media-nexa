import { Document, Model, model, ObjectId, Schema } from "mongoose";

export interface ITodo {
  user_id: string | ObjectId;
  title: string;
  description: string;
  imageLink?: string;
  createdAt: Date;
  updatedAt: Date;
  deleted_at?: Date;
  done: boolean;
}

export interface ITodoDocument extends ITodo, Document {}

export const TodoSchema = new Schema<ITodoDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});

const TodoModel: Model<ITodoDocument> = model<ITodoDocument>(
  "Todo",
  TodoSchema
);

export default TodoModel;
