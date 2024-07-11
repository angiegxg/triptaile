import { Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ProfileComponent } from './profile/profile.component';

export const PAGE_ROUTES: Routes = [
  { path: '', component: DetailComponent },
  { path: 'profile', component:ProfileComponent}
  

];