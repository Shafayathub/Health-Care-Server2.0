import { Request, Response } from "express";
import { userService } from "./user.service";
import status from "http-status";
import sendResponse from "../../utility/SendResponse";
import catchAsync from "../../utility/CatchAsync";


const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createAdminIntoDB(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin created successfully",
      data: result,
    })
})

export const userController = {
  createAdmin,
};
