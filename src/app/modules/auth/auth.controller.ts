import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import config from "../../config";

const userRegistration = catchAsync(async (req, res) => {
  const result = await authService.userRegisterIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User registration is successfull",
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await authService.userLogin(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User login is successfully',
    data: {
      accessToken,
    },
  });
});

export const authController = {
  userRegistration,
  userLogin
};
