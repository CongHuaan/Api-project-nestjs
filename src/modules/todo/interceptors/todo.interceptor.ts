import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class TodosInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          // Biến đổi dữ liệu response trước khi trả về cho client
          const response = data.map(({ description, ...todo }) => ({ ...todo }));
          return response;
        }),
      );
    }
  }
  