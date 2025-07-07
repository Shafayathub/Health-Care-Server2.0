import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import prisma from '../../config/prisma';
import config from '../../config';

const createAdminIntoDB = async (payload: any) => {
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

export const userService = {
    createAdminIntoDB,
};