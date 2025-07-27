import { Request, Response } from "express";
import statusCode from "http-status";
import sendResponse from "../../utility/SendResponse";
import catchAsync from "../../utility/CatchAsync";
import { SpecialtiesService } from "./speciality.service";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body)
    const result = await SpecialtiesService.inserIntoDB(req);

    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.getAllFromDB();
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: 'Specialties data fetched successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtiesService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});

export const SpecialtiesController = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
};