import { CustomError } from "@/utils/customError.util";
import UserModel, { IUser } from "@models/user.model";

export const getMe = async (id: string) => {
  try {
    const user = await UserModel.findOne(
      { _id: id },
      { password: 0, resetPasswordToken: 0 }
    );

    if (user && !user.profilePictureLink) {
      user.profilePictureLink = `${process.env.AWS_S3_BUCKET_LINK}/default-avatar.webp`;
    }

    return user;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new CustomError(
        "L'adresse email ou le nom d'utilisateur est déjà utilisé",
        409
      );
    }

    throw error;
  }
};

export const uploadAvatar = async (id: string, profilePictureLink: string) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { profilePictureLink, updatedAt: new Date() },
      { new: true }
    );
    return;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  try {
    data.updatedAt = new Date();

    const user = await UserModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    delete user?.password;
    delete user?.resetPasswordToken;

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
