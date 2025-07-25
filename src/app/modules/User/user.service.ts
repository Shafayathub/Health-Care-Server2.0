import bcrypt from "bcryptjs";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../utility/prisma";
import config from "../../config";
import { fileUploader } from "../../utility/fileUploader";
import { Request } from "express";
import { IAdminFilterRequest } from "../Admin/admin.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../utility/PaginationHelper";
import { userFilterableFields } from "./user.constants";


const createAdminIntoDB = async (req: Request) => {
  console.log(req.body);
  const payload = JSON.parse(req.body.data);
  const file = req.file;
  if (file) {
    const uploadResult = await fileUploader.uploadFileToCloudinary(file);
    payload.admin.profilePhoto = uploadResult.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.saltRound)
  );
  const userData = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  // This transaction ensures both the User and Admin are created, or neither is.
  const result = await prisma.$transaction(async (transactionClient) => {
    const newUser = await transactionClient.user.create({
      data: userData,
    });

    const newAdmin = await transactionClient.admin.create({
      data: payload.admin,
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

const createDoctorIntoDB = async (req: Request) => {
  const payload = JSON.parse(req.body.data);
  const file = req.file;
  if (file) {
    const uploadResult = await fileUploader.uploadFileToCloudinary(file);
    payload.doctor.profilePhoto = uploadResult.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.saltRound)
  );
  const userData = {
    email: payload.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };
  // This transaction ensures both the User and Admin are created, or neither is.
  const result = await prisma.$transaction(async (transactionClient) => {
    const newUser = await transactionClient.user.create({
      data: userData,
    });
    const newDoctor = await transactionClient.doctor.create({
      data: payload.doctor,
    });
    return newDoctor;
  });

  if (!result) {
    throw new Error("Failed to create doctor");
  }

  return result;
};

const createPatientIntoDB = async (req: Request) => {
  const payload = JSON.parse(req.body.data);
  const file = req.file;
  if (file) {
    const uploadResult = await fileUploader.uploadFileToCloudinary(file);
    payload.patient.profilePhoto = uploadResult.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.saltRound)
  );
  const userData = {
    email: payload.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };
  // This transaction ensures both the User and Admin are created, or neither is.

  const result = await prisma.$transaction(async (transactionClient) => {
    const newUser = await transactionClient.user.create({
      data: userData,
    });
    const newPatient = await transactionClient.patient.create({
      data: payload.patient,
    });
    return newPatient;
  });
  if (!result) {
    throw new Error("Failed to create patient");
  }
  return result;
};

const getAllUser = async (
  params: IAdminFilterRequest,
  options: IPaginationOptions
) => {
  const { searchTerm, ...filterData } = params;
  const paginationOptions = paginationHelper.calculatePagination(options);
  const andConditions: Prisma.UserWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: userFilterableFields.map((field:string) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as Record<string, string>)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput = { AND: andConditions };
  const result = await prisma.user.findMany({
    where: whereConditions,
    ...paginationOptions,
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      admin: true,
      doctor: true,
      patient: true,
      createdAt: true,
      updatedAt: true,
    }
  });
  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      page: Number(paginationOptions.skip + 1),
      limit: Number(paginationOptions.take),
      total,
    },
    data: result,
  };
};

const updateStatus = async (id: string, status: UserStatus) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return result;
};


const getMyProfile = async (user: any) => {
     const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        },
        select: {
            id: true,
            email: true,
            needPasswordChange: true,
            role: true,
            status: true
        }
    });

    let profileInfo;

    if (userInfo.role === UserRole.SUPER_ADMIN) {
        profileInfo = await prisma.admin.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === UserRole.ADMIN) {
        profileInfo = await prisma.admin.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === UserRole.DOCTOR) {
        profileInfo = await prisma.doctor.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === UserRole.PATIENT) {
        profileInfo = await prisma.patient.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }

    return { ...userInfo, ...profileInfo };
}

export const userService = {
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
  getAllUser,
  updateStatus,
  getMyProfile
};
