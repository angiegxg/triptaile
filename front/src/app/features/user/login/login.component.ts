import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserService } from '../../user/user.service';
import {  inject } from "@angular/core";
import * as types from '../../../shared/types'

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    NzFormModule,
    NzIconModule,
    NzInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly userService = inject(UserService)
  user!:types.Login
  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
   
  }>

  
  constructor(private fb: NonNullableFormBuilder){
this.loginForm=this.makeForm()
  }

  makeForm(): FormGroup{
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
     
    });
  }
  

  submitForm(): void {
    if (this.loginForm.valid) {
      const formData: types.Login = {
        email: this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value
      };
      console.log('submit', formData);
      this.userService.loginService(formData).subscribe((data: types.ResponseLogin) => {
       
       
      });
      
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

 
  }
  


  

