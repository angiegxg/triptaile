import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const authService =inject(UserService)
const token=authService.getTokenService()

const excludedUrl = 'http://localhost:3000/welcome';

 
  if (req.url === excludedUrl) {
    return next(req); 
  }

if(token) {
  req = req.clone({
    setHeaders: {
      Authorization: `${token}`
    }
  });
}
console.log(req)
  return next(req);
};
