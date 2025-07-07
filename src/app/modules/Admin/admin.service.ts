import { Prisma } from "@prisma/client";
import prisma from "../../utility/prisma";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper } from "../../utility/PaginationHelper";



const getAllAdmin = async (params: any, options: any) => {
  const {searchTerm, ...filterData} = params;
  const paginationOptions = paginationHelper.calculatePagination(options);
  const andConditions: Prisma.AdminWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if(Object.keys(filterData).length > 0){
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        }
      }))
    })
  }
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    ...paginationOptions,
  });
  return result;
};

export const adminService = {
  getAllAdmin,
};
