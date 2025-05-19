import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';


interface ApiResponse<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;
}

export class ResponseHelper {
  static sendResponse<T>(res: Response, statusCode: HttpStatus, data:T , message: string) {
    return res.status(statusCode).json({
      statusCode,
      message,
      data,
    } as ApiResponse<T>);
  }

  static sendError(res: Response, statusCode: HttpStatus, message: string) {
    return res.status(statusCode).json({
      statusCode,
      message,
    });
  }
}