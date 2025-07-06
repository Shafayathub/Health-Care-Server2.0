import { PrismaClient } from '@prisma/client';

// Instantiate Prisma Client to be used across the application
const prisma = new PrismaClient();

export default prisma;