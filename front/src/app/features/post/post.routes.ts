import { Routes } from '@angular/router';
import { PostFormComponent } from './post-form/post-form.component';


export const PLACE_ROUTES: Routes = [
  { path: 'editpost', component: PostFormComponent },
  { path: 'newpost', component: PostFormComponent },
  

];
