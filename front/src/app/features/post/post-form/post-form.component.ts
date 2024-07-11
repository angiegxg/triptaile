import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as types from '../../../shared/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../../services/upload-file.service';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { sanitizer } from '../../../core/validators/validator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    ErrorMessageComponent
    

  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent {
  public readonly postService = inject(PostService)
  public postForm: FormGroup
  public currentRoute!: string
  public post!: types.Post
  public isEditable: boolean = false
  public mixedpost!: types.Place
  private fb=inject(FormBuilder)
  private router= inject(Router)
  private fileUploadService = inject(UploadFileService)
  private readonly activeRoute = inject(ActivatedRoute)
  private readonly userService = inject(UserService)
  private user = this.userService.user
  private message= inject(NzMessageService) 
  constructor(){
   
    this.postForm=this.makeForm()
    this.editForm();
  //   this.currentRoute = this.activeRoute.snapshot.routeConfig?.path || '';
  //   if (this.currentRoute === 'editpost') {
  //     this.editForm();
    
  // }else{

  // }

  }


  makeForm():FormGroup{
    return this.fb.group({
       _id: [''],
        idUser: ['', [Validators.required, sanitizer()]],
        place: ['', [Validators.required, sanitizer()]],
        review: ['', [Validators.required, sanitizer()]],
        cover: ['', [Validators.required]],
        rate: [0, [Validators.required, sanitizer()]],
        private: [false, Validators.required] 


    })

  }

  editForm() {

   
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation?.extras?.state?.['mixedpost']) {

      this.mixedpost = navigation?.extras?.state?.['mixedpost']
      this.currentRoute = this.activeRoute.snapshot.routeConfig?.path || '';
    if (this.currentRoute === 'editpost') {
      const editpost =this.postService.getPostById(navigation?.extras?.state?.['mixedpost']._id)
      if (editpost){
        this.post=editpost
      }
      this.postForm.patchValue(this.post);
    
  }else{
    this.postForm.patchValue({
      idUser: this.user()?._id,
      place: this.mixedpost._id,
      
    })

  }

      
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileUploadService.upload(file).subscribe(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            
            this.postForm.patchValue({
              cover: event.body.url
            });
          }
        },
        (error) => {
          this.message.create("error", `Error uploading file${error.message}`);
          
        }
      );
    }
  }

  togglePrivate(): void {
    const currentValue = this.postForm.get('private')?.value;
    this.postForm.get('private')?.setValue(!currentValue);
   
  }



  submitForm() {
    if (this.postForm.valid) {
      const formDataCopy = { ...this.postForm.value };

      if (this.currentRoute === 'newpost') {
       
        delete formDataCopy._id;
        

        this.postService.createPostService(formDataCopy).subscribe(
          (response) => {
            this.message.create("success", `Post has been successfully created`)
            this.router.navigate(['/welcome']);
          },
          (error) => {
            this.message.create("error", `Post hasn't been successfully created`);
          }
        );
      } else if (this.currentRoute === 'editpost') {
        

        this.postService.updatePostService(this.postForm.value).subscribe(
          (response) => {
            this.message.create("success", `Post has been successfully edited`)
           
          },
          (error) => {
            this.message.create("error","Error updating place" )
           
          }
        );
      }
    } else {
      console.log('Form is invalid:', this.postForm);
      for (const controlName in this.postForm.controls) {
        if (this.postForm.controls.hasOwnProperty(controlName)) {
          const control = this.postForm.get(controlName);
          if (control && !control.valid) {
            this.message.create("warning", `${controlName}: ${control.valid}`);
            
          }
         
          
          if (control instanceof FormGroup) {
            for (const subControlName in control.controls) {
              if (control.controls.hasOwnProperty(subControlName)) {
                const subControl = control.get(subControlName);
                this.message.create("warning", `  ${subControlName}: ${subControl?.valid}`);
                
              }
            }
          }
        }
      }
    }
  }


}
