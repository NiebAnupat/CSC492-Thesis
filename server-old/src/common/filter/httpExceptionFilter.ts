import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ServiceResponse } from '../dto/service.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(
      `HTTP Status: ${status} Error Message: ${exception.message}`,
      exception.stack,
    );

    const serviceRes = ServiceResponse.fail(exception.message);

    response.status(status).json(serviceRes);
  }
}
