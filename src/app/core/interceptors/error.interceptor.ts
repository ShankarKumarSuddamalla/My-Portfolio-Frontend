import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/')) {
        toast.warning('Session Required', 'Please sign in to access administrative resources.');
      } else if (error.status === 403) {
        toast.error('Access Denied', 'Administrative privileges required for this action.');
      } else if (error.status === 500) {
        toast.error('Server Failure', 'An unexpected error occurred on the server.');
      }
      return throwError(() => error);
    })
  );
};
