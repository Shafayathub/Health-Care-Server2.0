import { Doctor, Prisma, UserStatus } from "@prisma/client";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../utility/PaginationHelper";
import { IDoctorFilterRequest, IDoctorUpdate } from "./doctor.interface";
import { doctorSearchableFields } from "./doctor.constants";
import prisma from "../../utility/prisma";



const getAllFromDB = async (params: IDoctorFilterRequest, options: IPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  const paginationOptions = paginationHelper.calculatePagination(options);
  const andConditions: Prisma.AdminWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map((field) => ({
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

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.DoctorWhereInput = { AND: andConditions as Prisma.DoctorWhereInput[] };
  const result = await prisma.doctor.findMany({
    where: whereConditions,
    ...paginationOptions,
  });
  const total = await prisma.doctor.count({
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

const getByIdFromDB = async (id: string): Promise<Doctor | null> => {
    const result = await prisma.doctor.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    });
    return result;
};

const updateIntoDB = async (id: string, payload: IDoctorUpdate) => {
    const { specialties, ...doctorData } = payload;

    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where: {
            id
        }
    });

    await prisma.$transaction(async (transactionClient) => {
        await transactionClient.doctor.update({
            where: {
                id
            },
            data: doctorData
        });

        if (specialties && specialties.length > 0) {
            // delete specialties
            const deleteSpecialtiesIds = specialties.filter(specialty => specialty.isDeleted);
            //console.log(deleteSpecialtiesIds)
            for (const specialty of deleteSpecialtiesIds) {
                await transactionClient.doctorSpecialty.deleteMany({
                    where: {
                        doctorId: doctorInfo.id,
                        specialtyId: specialty.specialtiesId
                    }
                });
            }

            // create specialties
            const createSpecialtiesIds = specialties.filter(specialty => !specialty.isDeleted);
            console.log(createSpecialtiesIds)
            for (const specialty of createSpecialtiesIds) {
                await transactionClient.doctorSpecialty.create({
                    data: {
                        doctorId: doctorInfo.id,
                        specialtyId: specialty.specialtiesId
                    }
                });
            }
        }
    })

    const result = await prisma.doctor.findUnique({
        where: {
            id: doctorInfo.id
        },
        include: {
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    })
    return result;
};

const deleteFromDB = async (id: string): Promise<Doctor> => {
    return await prisma.$transaction(async transactionClient => {
        const deleteDoctor = await transactionClient.doctor.delete({
            where: {
                id,
            },
        });

        await transactionClient.user.delete({
            where: {
                email: deleteDoctor.email,
            },
        });

        return deleteDoctor;
    });
};

const softDelete = async (id: string): Promise<Doctor> => {
    return await prisma.$transaction(async transactionClient => {
        const deleteDoctor = await transactionClient.doctor.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });

        await transactionClient.user.update({
            where: {
                email: deleteDoctor.email,
            },
            data: {
                status: UserStatus.DELETED,
            },
        });

        return deleteDoctor;
    });
};



export const DoctorService = {
    updateIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB,
    softDelete
}