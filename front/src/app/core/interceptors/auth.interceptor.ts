import type { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token: string = localStorage.getItem('authorization') || 'string';

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `${token}`
        }
      });
    }
   

    return next(request).pipe(catchError(HttpInterceptorFn));
  }

  return next(req).pipe(catchError(HttpInterceptorFn));
};

function HttpInterceptorFn(error: HttpErrorResponse): ReturnType<typeof throwError> {
  const errorResponse = `Error code: ${error.status}, Error message: ${error.message}`;
  return throwError(() => errorResponse);
};
