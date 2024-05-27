import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';

export const PLACE_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit', component: FormComponent},
  { path: 'newplace', component: FormComponent},

];
