import { model, Schema } from "mongoose";
import { IUser } from "./auth.interface";

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "trainer", "trainee"],
      default: "trainee",
      required: true,
    },
    phone: { type: String },
    dateOfBirth: { type: Date },
    specialization: { type: String }, // For trainers
    membershipType: { type: String }, // For trainees
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
