import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as types from '../../../shared/types';
import { UserService } from '../user.service';
import { UploadFileService } from '../../../services/upload-file.service';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { sanitizer } from '../../../core/validators/validator';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user!: types.User;
  public userForm: FormGroup;
  private message= inject(NzMessageService) 
  private userService = inject(UserService)
  private fileUploadService = inject(UploadFileService)

  constructor(private fb: FormBuilder) {
    this.userForm = this.makeForm();
  }

  makeForm(): FormGroup {
    return this.fb.group({
      nickname: ['', [Validators.required, sanitizer()]],
      email: ['', [Validators.required, Validators.email, sanitizer()]],
      password: ['', [Validators.required,sanitizer()]],
      nation: ['', [Validators.required, sanitizer()]],
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
            
            this.userForm.patchValue({
              avatar: event.body.url
            });
          }
        },
        (error) => {
          this.message.create("error", `Error uploading file ${error.message }`)
         
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
          this.message.create("success", `Usser has been created successfully`)
          
         
        },
        (error) => {
          this.message.create("error", `Usser hasn't been created ${error.message }`)
        }
      );
      
    }
  }
}
