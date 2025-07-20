import { Schema } from "mongoose";

export interface IBooking {
  trainee: Schema.Types.ObjectId; // MongoDB ObjectId (as string)
  class: Schema.Types.ObjectId;   // MongoDB ObjectId (as string)
  bookingDate?: Date;
  status?: 'confirmed' | 'cancelled';
}