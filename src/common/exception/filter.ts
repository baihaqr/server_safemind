// src/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

/*** 
 * 
 * This filter handles HTTP exceptions and formats the response.
 * It catches exceptions thrown in the application and sends a structured response to the client.
 * if erorr occurs, it will return a 400 status code with a message.
 *
*/

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 400;
    const message = exception.message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
   
      message,
    });
  }
}