import { DateTime } from 'luxon';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsString,
} from 'nestjs-swagger-dto';

export class ServiceResponse<T> {
  @IsBoolean()
  isSuccess: boolean;
  @IsString()
  message: string;

  @IsObject()
  data: T;

  @IsDate({ format: 'date-time' })
  serverDateTime: DateTime<true>;

  @IsNumber()
  totalAmountRecords: number;

  @IsNumber()
  totalAmountPages: number;

  @IsNumber()
  currentPage: number;

  @IsNumber()
  recordsPerPage: number;

  @IsNumber()
  pageIndex: number;
  constructor(
    isSuccess: boolean,
    message: string,
    data: any = null,
    totalAmountRecords: number = 0,
    totalAmountPages: number = 0,
    currentPage: number = 0,
    recordsPerPage: number = 0,
    pageIndex: number = 0,
  ) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
    this.totalAmountRecords = totalAmountRecords;
    this.totalAmountPages = totalAmountPages;
    this.currentPage = currentPage;
    this.recordsPerPage = recordsPerPage;
    this.pageIndex = pageIndex;
    this.serverDateTime = DateTime.now().toUTC();
  }

  static success<T>(data?: T, message: string = 'Success'): ServiceResponse<T> {
    return new ServiceResponse(true, message, data || null);
  }

  static fail<T>(message: string = 'Failed'): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static notFound<T>(message: string = 'Not Found'): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static unauthorized<T>(message: string = 'Unauthorized'): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static forbidden<T>(message: string = 'Forbidden'): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static badRequest<T>(message: string = 'Bad Request'): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static internalServerError<T>(
    message: string = 'Internal Server Error',
  ): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static notImplemented<T>(
    message: string = 'Not Implemented',
  ): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static serviceUnavailable<T>(
    message: string = 'Service Unavailable',
  ): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static gatewayTimeout<T>(
    message: string = 'Gateway Timeout',
  ): ServiceResponse<T> {
    return new ServiceResponse(false, message, null);
  }

  static custom<T>(
    isSuccess: boolean,
    message: string,
    data: T,
  ): ServiceResponse<T> {
    return new ServiceResponse(isSuccess, message, data);
  }
}
