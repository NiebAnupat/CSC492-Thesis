export class ServiceResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  serverTime: Date;
  constructor(isSuccess: boolean, message: string, data: any) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
    this.serverTime = new Date();
  }

  static success<T>(data: T, message: string = 'Success'): ServiceResponse<T> {
    return new ServiceResponse(true, message, data);
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
