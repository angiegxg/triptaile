import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserService } from '../user.service';
import * as types from '../../../shared/types'
import { FormBuilder, FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../../shared/validators.service';
import { FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [
    CommonModule,
    NzTableModule,
    FormsModule,
    NzCheckboxModule,
    NzIconModule,
    NzPopconfirmModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  editCache: { [key: string]: { edit: boolean; data: types.User } } = {};
  private userService = inject(UserService)
  private fb =inject(FormBuilder)
  private validator =inject(ValidatorsService)
  private message= inject(NzMessageService) 
  listOfData=this.userService.usersAdmin;
  private destroy$ = new Subject<void>();
  
  private router = inject(Router)
  constructor() {
    this.userService.getUsers()
    
    
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData().findIndex(item => item._id === id);

    this.editCache[id] = {
      data: { ...this.listOfData()[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData().findIndex(item => item._id === id);
    const nicknameControl = new FormControl(this.editCache[id].data.nickname, [this.validator.requiredValidator]);
    const emailControl = new FormControl(this.editCache[id].data.email, [this.validator.requiredValidator, this.validator.emailValidator]);
    if(nicknameControl.valid && emailControl.valid){
      this.userService.updateUserService(this.editCache[id].data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {         
          Object.assign(this.listOfData()[index], this.editCache[id].data);
          this.message.create("success", `Usser has been successfully edited`)
        },
        error: error => {
          console.log('entro a error',error)
          this.message.create("error", error)
        }
      });
    }else{    
        this.message.create("error", `Data invalidated`)
    }
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
       this.listOfData().forEach(item => {
      this.editCache[item._id!] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      });
    }
    
    this.updateEditCache();
  }

  

  delete(id: string): void {
    const dataIndex = this.listOfData().findIndex(item => item._id === id)
    this.userService.deleteUserService(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: response=> {
      delete this.editCache[id]
      this.updateEditCache()
      },
      error: error => {
        this.message.create("error", `User hasn't been deleted`)
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
