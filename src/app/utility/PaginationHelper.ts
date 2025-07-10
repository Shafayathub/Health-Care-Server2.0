import { IPaginationOptions, IPaginationResult } from "../interfaces/pagination";

const calculatePagination = (options: IPaginationOptions): IPaginationResult => {

  const page:number = Number(options?.page || 1);
  const limit: number = Number(options?.limit || 10);
  const skip:number = (page - 1) * limit;
  const sortBy = options?.sortBy || "createdAt";
  const sortOrder = options?.sortOrder || "desc";
  const orderBy = {
    [sortBy]: sortOrder,
  };
  return {
    skip,
    take: limit,
    orderBy,
  };
};

export const paginationHelper = {
  calculatePagination,
};