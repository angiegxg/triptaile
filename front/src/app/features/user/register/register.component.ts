import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as types from '../../../shared/types';
import { UserService } from '../user.service';
import { UploadFileService } from '../../../services/upload-file.service';
import { HttpEvent, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user!: types.User;
  public userForm: FormGroup;

  private userService = inject(UserService)
  private fileUploadService = inject(UploadFileService)

  constructor(private fb: FormBuilder) {
    this.userForm = this.makeForm();
  }

  makeForm(): FormGroup {
    return this.fb.group({
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      nation: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      file: [null]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileUploadService.upload(file).subscribe(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('Server response:', event.body);
            this.userForm.patchValue({
              avatar: event.body.url
            });
          }
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  submitForm(): void {
console.log(this.userForm.valid)
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.userService.registerUserService(formData).subscribe(
        (response) => {
          console.log('Server response:', response);
         
        },
        (error) => {
          console.error('Error updating place:', error);
        }
      );
      
    }
  }
}
