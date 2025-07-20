import { model, Schema } from 'mongoose';
import { IClass } from './class.interface';

const classSchema = new Schema(
  {
    className: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    maxTrainees: { type: Number, default: 10 },
    currentTrainees: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

classSchema.index({ date: 1 }, { unique: false });

export const Class = model<IClass>('Class', classSchema);
