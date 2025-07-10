import { NextFunction, Request, Response } from "express"
import status from "http-status";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode;
    let message = err.message || "Something went wrong!";

    if (err?.name === 'PrismaClientKnownRequestError') {
        if (err.code === 'P2002') {
            statusCode = status.CONFLICT;
            message = 'Duplicate entry found';
        } else if (err.code === 'P2025') {
            statusCode = status.NOT_FOUND;
            message = 'Record not found';
        } else if (err.code === 'P2003') {
            statusCode = status.BAD_REQUEST;
            message = 'Foreign key constraint failed';
        }
    } else if (err?.name === 'ValidationError') {
        statusCode = status.BAD_REQUEST;
        message = 'Validation Error';
    } else if (err?.name === 'UnauthorizedError') {
        statusCode = status.UNAUTHORIZED;
        message = 'Unauthorized Access';
    } else if (err?.name === 'ForbiddenError') {
        statusCode = status.FORBIDDEN;
        message = 'Forbidden Access';
    }

    res.status(statusCode || status.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: message || "Something went wrong!",
        error: err
    })
};

export default globalErrorHandler;