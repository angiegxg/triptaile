import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../features/post/post.service';
import * as types from '../../shared/types'
import { UserService } from '../../features/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public readonly postService = inject(PostService)
  public userService = inject (UserService)
  public postUser!:types.Post[]
  public idUser= this.userService.user()?._id
  
  constructor(){
if(this.idUser){
  this.postService.getPostByUser(this.idUser)
  }
}




}
