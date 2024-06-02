import { Component, Input , inject} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from '../drop-down/drop-down.component';
import * as types from '../../types'
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../features/user/user.service';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NzCardModule,
    CommonModule,
    DropDownComponent,
    RouterModule
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() place!: types.Place;
  public readonly userService =inject(UserService)
  isAdmin=this.userService.user()?.role

  constructor(private router: Router) { }

 
}
