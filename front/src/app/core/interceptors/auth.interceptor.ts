import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../features/user/user.service';
import { HttpHeaders } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(UserService);
  const token = authService.getTokenService();
  const newHeaders = new HttpHeaders().set('Authorization', `${token}`);
    
    const clonedReq = req.clone({
      headers: newHeaders,
    });
    console.log('este es la req modificada', clonedReq);
    return next(clonedReq);
  
};
