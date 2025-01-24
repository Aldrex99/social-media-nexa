import TodoModel, { ITodo } from "@models/todo.model";

export const getTodos = async (user_id: string) => {
  try {
    const todos = await TodoModel.find({ is_deleted: false, user_id });
    return todos;
  } catch (error) {
    throw error;
  }
};

export const getTodo = async (id: string, user_id: string) => {
  try {
    const todo = await TodoModel.findOne({
      _id: id,
      user_id,
      is_deleted: false,
    });
    return todo;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (data: Partial<ITodo>): Promise<ITodo> => {
  try {
    const todo = new TodoModel(data);
    await todo.save();
    return todo;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (
  id: string,
  user_id: string,
  data: Partial<ITodo>
) => {
  try {
    data.updated_at = new Date();

    const todo = await TodoModel.findOneAndUpdate(
      { _id: id, user_id, is_deleted: false },
      data,
      {
        new: true,
      }
    );
    return todo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: string, user_id: string) => {
  try {
    await TodoModel.findByIdAndUpdate(
      {
        _id: id,
        user_id,
        is_deleted: false,
      },
      {
        is_deleted: true,
        deleted_at: new Date(),
      }
    );
  } catch (error) {
    throw error;
  }
};
