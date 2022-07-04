import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}

  catch(exception: HttpException | any, host: ArgumentsHost): void {
    const httpAdapter = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception.response.message?.length > 1
        ? exception.response.message
        : exception.response.message[0];

    const responseBody = {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      statusCode: httpStatus,
      error: exception.response.error,
      message: errorMessage,
      timestamp: new Date().toISOString()
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
