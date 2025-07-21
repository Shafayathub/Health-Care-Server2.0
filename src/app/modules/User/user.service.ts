import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import prisma from '../../utility/prisma';
import config from '../../config';
import { fileUploader } from '../../utility/fileUploader';

const createAdminIntoDB = async (req: any) => {
    const payload = JSON.parse(req.body.data);
    const file = req.file;
    if(file){
        const uploadResult = await fileUploader.uploadFileToCloudinary(file);
        payload.admin.profilePhoto = uploadResult.secure_url;
    }
    const hashedPassword: string = await bcrypt.hash(payload.password, Number(config.saltRound));
    const userData = {
        email: payload.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }
    // This transaction ensures both the User and Admin are created, or neither is.
    const result = await prisma.$transaction(async (transactionClient) => {
        const newUser = await transactionClient.user.create({
            data: userData
        });

        const newAdmin = await transactionClient.admin.create({
            data: payload.admin
        });

        // Omit password from the returned object
        // const { password, ...userWithoutPassword } = newUser;
        // return userWithoutPassword;
        return newAdmin;
    });

    if (!result) {
        throw new Error("Failed to create admin");
    }

    return result;
};

const createDoctorIntoDB = async (req: any) => {
    const payload = JSON.parse(req.body.data);
    const file = req.file;
    if(file){
        const uploadResult = await fileUploader.uploadFileToCloudinary(file);
        payload.doctor.profilePhoto = uploadResult.secure_url;
    }
    const hashedPassword: string = await bcrypt.hash(payload.password, Number(config.saltRound));
    const userData = {
        email: payload.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }
    // This transaction ensures both the User and Admin are created, or neither is.
    const result = await prisma.$transaction(async (transactionClient) => {
        const newUser = await transactionClient.user.create({
            data: userData
        });
        const newDoctor = await transactionClient.doctor.create({
            data: payload.doctor
        })
        return newDoctor;
    });

    if (!result) {
        throw new Error("Failed to create doctor");
    }

    return result;
};



export const userService = {
    createAdminIntoDB,
    createDoctorIntoDB,
};