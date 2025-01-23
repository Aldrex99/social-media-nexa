import { Document, Model, model, ObjectId, Schema } from "mongoose";

export interface ITodo {
  title: string;
  description: string;
  imageLink?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  done: boolean;
  is_deleted: boolean;
  user_id: string;
}

export interface ITodoDocument extends ITodo, Document {}

export const TodoSchema = new Schema<ITodoDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageLink: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date },
  done: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  user_id: { type: Schema.Types.String, ref: "User" },
});

const TodoModel: Model<ITodoDocument> = model<ITodoDocument>(
  "Todo",
  TodoSchema
);

export default TodoModel;
