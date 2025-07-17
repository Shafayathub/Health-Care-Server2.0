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
        payload.admin.profilePhoto = (uploadResult as any).secure_url;
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

const saveUploadedFileUrl = async (filename: string, secureUrl: string) => {
    // Find the admin by filename (assuming filename is unique and matches an admin's email or id)
    // Here, let's assume filename is the admin's email for simplicity
    const admin = await prisma.admin.findUnique({ where: { email: filename } });
    if (!admin) {
        throw new Error("Admin not found for the given filename (email)");
    }
    const updatedAdmin = await prisma.admin.update({
        where: { email: filename },
        data: { profilePhoto: secureUrl }
    });
    return updatedAdmin;
};

export const userService = {
    createAdminIntoDB,
    saveUploadedFileUrl
};