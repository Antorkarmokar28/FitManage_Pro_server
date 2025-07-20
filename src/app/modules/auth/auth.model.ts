/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: ['admin', 'trainer', 'trainee'],
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
  },
);

// this function using for user password hash
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
// user find by email with static method
userSchema.statics.isUserExitsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};
// user password match checkin with static method
userSchema.statics.isPasswordMatched = async function (
  planeTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planeTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);
