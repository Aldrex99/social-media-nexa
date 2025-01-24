import { CustomError } from "@/utils/customError.util";
import UserModel, { IUser } from "@models/user.model";
import { checkPassword, hashPassword } from "@utils/password.util";
import { randomUUID } from "crypto";

export const register = async (data: Partial<IUser>) => {
  try {
    const hashedPassword = await hashPassword(data.password as string);
    data.password = hashedPassword;

    const user = new UserModel(data);
    await user.save();
    return;
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

export const login = async (email: string, password: string) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new CustomError(
        "L'email ou le mot de passe est incorrect",
        401,
        "INVALID_CREDENTIALS"
      );
    }

    const isMatch = await checkPassword(password, user.password as string);
    if (!isMatch) {
      throw new CustomError(
        "L'email ou le mot de passe est incorrect",
        401,
        "INVALID_CREDENTIALS"
      );
    }

    user.password = undefined;
    user.reset_password_token = undefined;

    return user;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new CustomError("Aucun utilisateur trouvé avec cet email", 404);
    }

    // Generate reset password token
    const reset_password_token = randomUUID();

    // Update user with reset password token
    await UserModel.findOneAndUpdate(
      { email },
      { reset_password_token },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};
