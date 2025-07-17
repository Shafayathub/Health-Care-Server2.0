import { Request, Response } from "express";
import { userService } from "./user.service";
import status from "http-status";
import sendResponse from "../../utility/SendResponse";
import catchAsync from "../../utility/CatchAsync";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createAdminIntoDB(req);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Admin created successfully",
      data: result,
    })
});


export const userController = {
  createAdmin,
};
