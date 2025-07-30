import { Request, Response } from "express";
import status from "http-status";
import { adminService } from "./admin.service";
import pick from "../../utility/Pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../utility/SendResponse";
import catchAsync from "../../utility/CatchAsync";

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await adminService.getAllAdmin(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.getSingleAdmin(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await adminService.updateAdmin(id, payload);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.deleteAdmin(id);
  sendResponse(res, {
    statusCode: status.NO_CONTENT,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

const softDeleteAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await adminService.softDeleteAdmin(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin soft deleted successfully",
      data: result,
    });
  }
);

export const adminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
