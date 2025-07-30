export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginationResult {
  skip: number
  take: number
  orderBy:{
    [key: string]: 'asc' | 'desc'
  }
}