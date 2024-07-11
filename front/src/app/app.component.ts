import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserService } from './features/user/user.service';

import { SearchPlaceComponent } from './shared/components/filters/search-place/search-place.component';
import { FilterByProvidenceComponent } from './shared/components/filters/filter-by-providence/filter-by-providence.component';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from './shared/components/avatar/avatar.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NzIconModule, 
    NzLayoutModule, 
    NzMenuModule,
   
    SearchPlaceComponent,
    RouterModule,
    FilterByProvidenceComponent,
    AvatarComponent,
    NzDropDownModule,
   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  private readonly UserService = inject(UserService);
  user = this.UserService.user
 auth = this.UserService.isAuthService()
 
 constructor(){
  this.UserService.getUserByToken()
  
  
 }
  logout(): void {
    this.UserService.logOutService()
     
    };
  
}
