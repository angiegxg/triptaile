import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import * as types from '../../types'
import { formatDistance } from 'date-fns';

@Component({
  selector: 'app-review',
  standalone:true,
  imports:[
    CommonModule,
    NzCommentModule
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
@Input() review!: types.Post
  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }
}
