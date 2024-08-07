import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  
  { path: 'welcome',loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)},
  { path: 'place', loadChildren: () => import('./features/place/place.routes').then(m => m.PLACE_ROUTES) },
  { path: 'auth', loadChildren: () => import('./features/user/auth.routes').then(m => m.AUTH_ROUTES) },
  { path: 'detail', loadChildren: () => import('./pages/pages.routes').then(m => m.PAGE_ROUTES) },
  { path: 'post', loadChildren: () => import('./features/post/post.routes').then(m => m.PLACE_ROUTES) },
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: '**', pathMatch: 'full', redirectTo: '/welcome' }
  

];
