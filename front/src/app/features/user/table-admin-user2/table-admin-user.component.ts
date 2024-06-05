import { Component, inject } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { Router, RouterOutlet } from '@angular/router';
import * as types from '../../../shared/types';
import { NzFormModule } from 'ng-zorro-antd/form';

import { UserService } from '../user.service'

@Component({
  selector: 'app-tabla-user',
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
  private  router=inject(Router)

  constructor(){
    console.log("estoy en el constructor")
    this.userService.getUsers()
  
  }

  i = 0;
  editId: String | null = null;
  listOfData: types.User[] = [];

  startEdit(data: any): void {
    console.log('esta es mi data', data);
    this.editId = data._id;
  }
  stopEdit(data: any): void {
    this.editId = null;
    this.userService.updateUserService(data)
  }
  

  deleteRow(_id: string): void {
    this.userService.deleteUserService(_id).subscribe({
      next: response => {
        console.log('Place deleted:', response);
        this.router.navigate(['/welcome']); 
      },
      error: error => {
        console.error('Error deleting place:', error);
      }
    });

  }

  onCheckboxChange(event: any, data: any, admin: boolean): void {
    // Comprueba si la casilla de verificación fue marcada o desmarcada
    const isChecked = event.target.checked;
    if (admin === false) data.role = isChecked;
    
    console.log('esta es mi data', data);

    this.stopEdit(data);
  }
}