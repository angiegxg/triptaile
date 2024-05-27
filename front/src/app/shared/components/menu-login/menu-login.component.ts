import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-menu-login',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    RouterModule
  ],
  styleUrls: ['./menu-login.component.scss'],
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent {
  private readonly UserService = inject(UserService);
 auth = this.UserService.isAuthService()
  logout(): void {
    this.UserService.logOutService()
     
    };
}
