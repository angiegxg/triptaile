import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserService } from './services/user.service';
import { MenuLoginComponent } from './shared/components/menu-login/menu-login.component';
import { SearchPlaceComponent } from './shared/components/filters/search-place/search-place.component';
import { FilterByProvidenceComponent } from './shared/components/filters/filter-by-providence/filter-by-providence.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NzIconModule, 
    NzLayoutModule, 
    NzMenuModule,
    MenuLoginComponent,
    SearchPlaceComponent,
    FilterByProvidenceComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  private readonly UserService = inject(UserService);
  user = this.UserService.user

  
  
}
