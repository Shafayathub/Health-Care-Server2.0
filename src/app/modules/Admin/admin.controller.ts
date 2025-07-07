import { Request, Response } from "express";
import status from "http-status";
import { adminService } from "./admin.service";
import pick from "../../utility/Pick";
import { adminFilterableFields } from "./admin.constant";


const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await adminService.getAllAdmin(filters, options);
    res.status(status.OK).json({
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(status.BAD_REQUEST).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      error: error,
    });
  }
};

export const adminController = {
  getAllAdmin,
};
