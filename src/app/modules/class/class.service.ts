import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';
import { IClass } from './class.interface';
import { Class } from './class.model';

const createClassIntoDB = async (classData: IClass) => {
  // Check if trainer exists and is actually a trainer
  const trainer = await User.findById(classData.trainer);
  if (!trainer || trainer.role !== 'trainer') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid trainer specified');
  }
  // Check if date is in the future
  if (new Date(classData.date) < new Date()) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Class date must be in the future',
    );
  }
  // Check if we already have 5 classes on this day
  const classesOnDate = await Class.countDocuments({ date: classData.date });
  if (classesOnDate >= 5) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Maximum of 5 classes allowed per day',
    );
  }
  // Check for time conflicts for the trainer
  const conflictingClass = await Class.findOne({
    trainer: classData.trainer,
    date: classData.date,
    $or: [
      {
        startTime: { $lt: classData.endTime },
        endTime: { $gt: classData.startTime },
      },
    ],
  });
  if (conflictingClass) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Trainer is already assigned to another class at this time',
    );
  }
  const newClass = await Class.create(classData);
  return newClass;
};
// get class by date
const getClassesByDate = async (date: Date) => {
  const classSchedule = await Class.find({ date }).populate('trainer', 'name');
  return classSchedule;
};
// get class by id
const getClassById = async (id: string) => {
  const classData = await Class.findById(id).populate('trainer', 'name');
  if (!classData) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Class not found');
  }
  return classData;
};
// update class by id
const updateClassIntoDB = async (id: string, updateData: Partial<IClass>) => {
  const classData = await Class.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!classData) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Class not found');
  }
  return classData;
};

const deleteClassFromTheDB = async (id: string) => {
  const classData = await Class.findByIdAndDelete(id);
  if (!classData) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Class not found');
  }
  return classData;
};

export const classService = {
  createClassIntoDB,
  getClassesByDate,
  getClassById,
  updateClassIntoDB,
  deleteClassFromTheDB,
};
