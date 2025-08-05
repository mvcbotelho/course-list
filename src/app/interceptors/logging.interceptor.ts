import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export const LoggingInterceptor: HttpInterceptorFn = (request, next) => {
  const startTime = new Date();

  const modifiedRequest = request.clone({
    setHeaders: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Client-Version': '1.0.0',
      'X-Request-Timestamp': startTime.toISOString()
    }
  });

  return next(modifiedRequest).pipe(
    tap(response => {
      // Log silencioso - apenas adiciona headers e rastreia
    }),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    })
  );
};
