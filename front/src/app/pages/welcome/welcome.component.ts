import { Component, OnInit, inject } from '@angular/core';
import { HomeComponent } from '../../features/place/home/home.component';
import { PostService } from '../../features/post/post.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public readonly postService= inject(PostService)
  
  constructor() {  
    
    this.postService.getPosts()
   
  }
  ngOnInit() {

   }

}
