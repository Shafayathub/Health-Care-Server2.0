import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import status from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createAdminIntoDB(req.body);
    res.status(status.CREATED).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error:any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      error: error,
    }) 
  }
};

export const userController = {
  createAdmin,
};
