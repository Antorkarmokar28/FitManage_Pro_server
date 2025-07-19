/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { User_Role } from "./auth.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "trainer" | "trainee";
  phone?: string;
  dateOfBirth?: Date | string;
  specialization?: string;
  membershipType?: string;
  isActive?: boolean;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface UserModel extends Model<IUser> {
  isUserExitsByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    planePassword: string,
    hashedPassword: string
  ): Promise<IUser>;
  isPasswordIssuedBeforeChange(
    passwordChangedTimestamp: Date,
    passwordIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof User_Role;
