import { UserRole, UserStatus } from "@prisma/client";

export type IAuthUser = {
    id: string;
    email: string;
    role: UserRole;
    status: UserStatus;
} | null;