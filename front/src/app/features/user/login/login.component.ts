import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserService } from '../../user/user.service';
import {  inject } from "@angular/core";
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { sanitizer } from '../../../core/validators/validator';
import * as types from '../../../shared/types'

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    NzFormModule,
    NzIconModule,
    NzInputModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorMessageComponent
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
      email: ['', [Validators.required, Validators.email,sanitizer() ]],
      password: ['', [Validators.required, sanitizer()]],
     
    });
  }
  

  submitForm(): void {
    if (this.loginForm.valid) {
      const formData: types.Login = {
        email: this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value
      };
     
      this.userService.loginService(formData)
      
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
  


  

