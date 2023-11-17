import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const logger = new Logger(exception.name);
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    logger.error(exception.message, exception.stack, ctx);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message ? exception.message : 'Wrong something';

    const responseBody = {
      success: false,
      statusCode: httpStatus,
      message: message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
      stack: exception.stack,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
