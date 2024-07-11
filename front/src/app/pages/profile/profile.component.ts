import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../features/post/post.service';
import * as types from '../../shared/types'
import { UserService } from '../../features/user/user.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { PlaceService } from '../../features/place/place.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    AvatarComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public readonly postService = inject(PostService)
  public userService = inject (UserService)
  public placeService = inject (PlaceService)
  public postUser=this.postService.mixedPostsUser
  public user= this.userService.user
  
  constructor(){

    const idUser= this.userService.user()?._id
    
if(idUser){
  this.postService.getPostByUser(idUser)
  

  }
}
}









