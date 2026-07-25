import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (authService.isAuthenticated()) {
    return true;
  }

  toast.warning('Access Denied', 'Please log in to access the Enterprise CMS Dashboard.');
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};
