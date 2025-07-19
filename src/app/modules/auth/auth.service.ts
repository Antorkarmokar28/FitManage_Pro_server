import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { ILoginUser, IUser } from "./auth.interface";
import { User } from "./auth.model";
import jwt from "jsonwebtoken";
import config from "../../config";
const userRegisterIntoDB = async (payload: IUser) => {
  const { email } = payload;
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email already in use");
  }
  const newUser = await User.create(payload);
  return newUser;
};

// user login
const userLogin = async (payload: ILoginUser) => {
  //find by user with email
  const user = await User.isUserExitsByEmail(payload.email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }
  //checking user password is matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }
  // create access token
  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "7d",
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};

export const authService = {
  userRegisterIntoDB,
  userLogin
};
