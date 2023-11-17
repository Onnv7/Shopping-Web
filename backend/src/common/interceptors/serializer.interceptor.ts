import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializerInterceptor<T> implements NestInterceptor {
  constructor(private dto: new () => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('SerializerInterceptor');
    return next.handle().pipe(
      map((data: any) => {
        console.log('SerializerInterceptor', data);

        console.log(
          'SerializerInterceptor =>>>>',
          plainToClass(this.dto, data, { strategy: 'excludeAll' }),
        );
        return plainToClass(this.dto, data, { strategy: 'excludeAll' });
      }),
    );
  }
}
