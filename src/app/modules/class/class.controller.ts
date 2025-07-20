import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { classService } from './class.service';
import AppError from '../../errors/AppError';

const createClass = catchAsync(async (req, res) => {
  const classData = await classService.createClassIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Class created successfully',
    data: classData,
  });
});

const getClassDate = catchAsync(async (req, res) => {
  const dateParam = req.params.date;

  if (!dateParam) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Date parameter is missing');
  }

  // Convert string to Date
  const date = new Date(dateParam);

  const classData = await classService.getClassesByDate(date);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Classes retrieved successfully',
    data: classData,
  });
});

const getClassById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await classService.getClassById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Classes retrieved successfully',
    data: result,
  });
});

const updateClass = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await classService.updateClassIntoDB(id, req.params);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Classes updated successfully',
    data: result,
  });
});

const deleteClass = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await classService.deleteClassFromTheDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Classes deleted successfully',
    data: result,
  });
});

export const classController = {
  createClass,
  getClassDate,
  getClassById,
  updateClass,
  deleteClass,
};
