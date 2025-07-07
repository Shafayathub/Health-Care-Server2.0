interface IPaginationOptions {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface IPaginationResult {
  skip: number
  take: number
  orderBy:{
    [key: string]: 'asc' | 'desc'
  }
}

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