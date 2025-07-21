import { Request, Response } from "express";
import { userService } from "./user.service";
import status from "http-status";
import sendResponse from "../../utility/SendResponse";
import catchAsync from "../../utility/CatchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createAdminIntoDB(req);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Admin created successfully",
      data: result,
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createDoctorIntoDB(req);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Doctor created successfully",
      data: result,
    })
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createPatientIntoDB(req);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Patient created successfully",
      data: result,
    })
});


export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
};
