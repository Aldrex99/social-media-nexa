import UserModel, { IUser } from "../models/user.model";

export const getUser = async (id: string) => {
  try {
    const user = await UserModel.findOne(
      { _id: id },
      { password: 0, reset_password_token: 0 }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  try {
    data.updated_at = new Date();

    const user = await UserModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    delete user?.password;
    delete user?.reset_password_token;

    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await UserModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
