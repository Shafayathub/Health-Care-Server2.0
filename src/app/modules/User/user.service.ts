import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import prisma from '../../config/prisma';

const createAdminIntoDB = async (payload: any) => {
    const { name, email, password, contactNumber } = payload;

    const hashedPassword = await bcrypt.hash(password, 12);

    // This transaction ensures both the User and Admin are created, or neither is.
    const result = await prisma.$transaction(async (transactionClient) => {
        const newUser = await transactionClient.user.create({
            data: {
                email,
                password: hashedPassword,
                role: UserRole.ADMIN // 2. Assign the specific role like this
            }
        });

        const newAdmin = await transactionClient.admin.create({
            data: {
                name,
                email,
                contactNumber,
            }
        });

        // Omit password from the returned object
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    });

    if (!result) {
        throw new Error("Failed to create admin");
    }

    return result;
};

export const AdminServices = {
    createAdminIntoDB,
};