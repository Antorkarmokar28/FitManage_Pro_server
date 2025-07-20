import mongoose, { Schema } from 'mongoose';
import { IBooking } from './booking.interface';

const BookingSchema = new Schema<IBooking>(
  {
    trainee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    bookingDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  },
);

// Compound index to ensure a trainee can't book the same class multiple times
BookingSchema.index({ trainee: 1, class: 1 }, { unique: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);
