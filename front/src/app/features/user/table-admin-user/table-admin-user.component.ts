import { Component, inject } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { RouterOutlet } from '@angular/router';
import * as types from '../../../shared/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserService } from '../user.service'

@Component({
  selector: 'app-table-admin-user',
  standalone: true,
  imports: [
    NzFormModule,
    NzTableModule,
    FormsModule,
    CommonModule,
    NzPopconfirmModule,
    NzPopoverModule,
    RouterOutlet
  ],
  templateUrl: './table-admin-user.component.html',
  styleUrl: './table-admin-user.component.scss'
})
export class TableAdminUserComponent {
  private readonly userService = inject(UserService);
  users = this.userService.usersAdmin;

  constructor(){
    this.userService.getUsers() 
  }

  i = 0;
  editId: String | null = null;
  listOfData: types.User[] = [];
  startEdit(email: String): void {
    this.editId = email;
  }

  stopEdit(): void {
    this.editId = null;
  }

 

  deleteRow(email: String): void {
    
  }
}



