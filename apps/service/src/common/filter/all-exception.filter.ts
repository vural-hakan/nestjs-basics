import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  // Http Exception Handler for reporting
  catch(exception: unknown) {
    throw exception;
  }
}
