import {
  Injectable,
  Logger,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, body } = context.getArgByIndex(0);
    this.logger.log(`Request to ${method} ${url}`);

    console.log(body);

    return next.handle().pipe(
      // map((data) => {
      //   const temp = { A: '1' };
      //   return temp;
      // }),
      tap((data) =>
        this.logger.log(
          `Response from ${method} ${url} \n response: ${JSON.stringify(data)}`,
        ),
      ),
    );
  }
}
