import { Request, Response } from "express";
import { userService } from "./user.service";
import statusCode from "http-status";
import sendResponse from "../../utility/SendResponse";
import catchAsync from "../../utility/CatchAsync";
import pick from "../../utility/Pick";
import { userFilterableFields } from "./user.constants";



const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createAdminIntoDB(req);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Admin created successfully",
      data: result,
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createDoctorIntoDB(req);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Doctor created successfully",
      data: result,
    })
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createPatientIntoDB(req);
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "Patient created successfully",
      data: result,
    })
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query)
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await userService.getAllUser(filters, options);
  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "Admin fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await userService.updateStatus(id, status);
  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUser,
  updateStatus,
};
