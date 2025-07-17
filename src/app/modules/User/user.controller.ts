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
      statusCode: status.OK,
      success: true,
      message: "Admin created successfully",
      data: result,
    })
});

const uploadFileToCloudinary = catchAsync(async (req: Request, res: Response) => {
    const { filename } = req.params;
    if (!filename) throw new Error("Filename is required");
    const filePath = path.join(process.cwd(), "uploads", filename);
    cloudinary.config({
        cloud_name: 'dfuaxbx5u',
        api_key: '954745828458377',
        api_secret: 'AeNKwdPu1eZbrEuqe10oUmtZA6I'
    });
    const uploadResult = await cloudinary.uploader.upload(filePath, { public_id: filename });
    const secureUrl = uploadResult.secure_url;
    // Store the secureUrl in DB using the service
    const dbResult = await userService.saveUploadedFileUrl(filename, secureUrl);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "File uploaded to Cloudinary and URL saved to DB",
        data: dbResult
    });
});

export const userController = {
  createAdmin,
  uploadFileToCloudinary
};
