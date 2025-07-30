import bcrypt from 'bcryptjs';
import { UserRole, UserStatus } from '@prisma/client';
import prisma from './prisma';
import config from '../config';

const seedSuperAdmin = async () => {
    try {
        // Check if super admin already exists
        const existingSuperAdmin = await prisma.user.findFirst({
            where: {
                role: UserRole.SUPER_ADMIN
            }
        });

        if (!existingSuperAdmin) {
            const hashedPassword = await bcrypt.hash('super123', Number(config.saltRound));
            
            // Create super admin using transaction
            await prisma.$transaction(async (transactionClient) => {
                const superAdminUser = await transactionClient.user.create({
                    data: {
                        email: 'superadmin@ph.com',
                        password: hashedPassword,
                        role: UserRole.SUPER_ADMIN,
                        status: UserStatus.ACTIVE,
                        needPasswordChange: true
                    }
                });

                await transactionClient.admin.create({
                    data: {
                        email: superAdminUser.email,
                        name: 'Super Admin',
                        contactNumber: '01XXXXXXXXX'
                    }
                });
            });

            console.log('🌱 Super Admin seeded successfully');
        } else {
            console.log('ℹ️ Super Admin already exists');
        }
    } catch (error) {
        console.error('Error seeding Super Admin:', error);
    }
};

export const dbSeeder = {
    seedSuperAdmin
};