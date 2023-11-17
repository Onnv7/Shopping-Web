import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private logger = new Logger(TransformInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const originalUrl = request.originalUrl;

    console.log('TransformInterceptor', request.body);
    return next.handle().pipe(
      map((data) => {
        console.log('TransformInterceptor =>>>');
        const response = {
          success: true,
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: data ?? undefined,
          path: originalUrl,
        };
        return response;
      }),
    );
  }
}
