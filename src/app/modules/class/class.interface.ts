import { Types } from 'mongoose';

export interface IClass {
  className: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  trainer: Types.ObjectId;
  maxTrainees?: number;
  currentTrainees?: number;
  isActive?: boolean;
}
