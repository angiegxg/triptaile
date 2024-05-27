import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },

  { path: 'welcome', 
    // canActivate: [authGuard],
    
    loadChildren: 
    () => import('./pages/welcome/welcome.routes')
   .then(m => m.WELCOME_ROUTES) 
  },
  { path: 'place', loadChildren: () => import('./features/place/place.routes').then(m => m.PLACE_ROUTES) },
  { path: 'auth', loadChildren: () => import('./pages/login/auth.routes').then(m => m.AUTH_ROUTES) }

];
