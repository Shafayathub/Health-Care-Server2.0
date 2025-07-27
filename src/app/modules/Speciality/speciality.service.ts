import { Request } from "express";
import { Specialty } from "@prisma/client";
import prisma from "../../utility/prisma";
import { fileUploader } from "../../utility/fileUploader";

const inserIntoDB = async (req: Request) => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadFileToCloudinary(file);
        req.body.icon = uploadToCloudinary?.secure_url;
    }

    const result = await prisma.specialty.create({
        data: req.body
    });

    return result;
};

const getAllFromDB = async (): Promise<Specialty[]> => {
    return await prisma.specialty.findMany();
}

const deleteFromDB = async (id: string): Promise<Specialty> => {
    const result = await prisma.specialty.delete({
        where: {
            id,
        },
    });
    return result;
};

export const SpecialtiesService = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
}