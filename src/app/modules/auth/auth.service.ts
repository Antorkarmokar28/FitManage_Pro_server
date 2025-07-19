import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser } from "./auth.interface";
import { User } from "./auth.model";

const userRegisterIntoDB = async (payload: IUser) => {
  const { email } = payload;
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This email is already exits");
  }
  const newUser = await User.create(payload);
  return newUser;
};

export const authService = {
  userRegisterIntoDB,
};
