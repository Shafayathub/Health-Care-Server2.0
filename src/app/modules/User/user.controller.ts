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
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createAdmin,
};
