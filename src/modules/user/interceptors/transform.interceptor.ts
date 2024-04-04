import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Biến đổi dữ liệu response trước khi trả về cho client
        const response = data.map(({password, firstName, lastName, ...user}) => {
          const temp = {...user, statusCode: context.switchToHttp().getResponse().statusCode};
          return temp;
        });
        
        // const response = {
        //   statusCode: context.switchToHttp().getResponse().statusCode,
        //   data: responseData,
        // };
        const users = {users: response};
        return users;
      }),
    );
  }
}
