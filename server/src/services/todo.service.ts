import TodoModel, { ITodo } from "@models/todo.model";

export const createTodo = async (data: Partial<ITodo>): Promise<ITodo> => {
  try {
    const todo = new TodoModel(data);
    await todo.save();
    return todo;
  } catch (error) {
    throw error;
  }
};

export const getTodo = async (id: string, user_id: string) => {
  try {
    const todo = await TodoModel.findOne({
      _id: id,
      user_id,
    });
    return todo;
  } catch (error) {
    throw error;
  }
};

export const getTodos = async (user_id: string) => {
  try {
    const todos = await TodoModel.find({ user_id });
    return todos;
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
    data.updatedAt = new Date();

    const todo = await TodoModel.findOneAndUpdate({ _id: id, user_id }, data, {
      new: true,
    });
    return todo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: string, user_id: string) => {
  try {
    await TodoModel.findOneAndDelete({ _id: id, user_id });
  } catch (error) {
    throw error;
  }
};
