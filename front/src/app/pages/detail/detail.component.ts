import { Component,inject} from '@angular/core';
import * as types from '../../shared/types'
import { PostService } from '../../features/post/post.service';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../../shared/components/review/review.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    NzDescriptionsModule,
    ReviewComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent  {
public detail! : types.Place
public readonly postService = inject(PostService)
public reviews!: types.Post[]
public readonly router = inject(Router)
constructor(){   
  
  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras?.state?.['detail']) {
    this.detail = navigation.extras.state['detail']; 

}
}

ngOnInit() {
 

    if (this.detail._id) {
      
        this.reviews = this.postService.getPostPublicByPlace(this.detail._id || "");
        console.log("estos son los post de este place", this.reviews);
      
    }
  }




getGoogleMapsUrl(): void {
  const { location } = this.detail;
  const [latitude, longitude] = location.coordinates;
 const url= `https://www.google.com/maps?q=${latitude},${longitude}`;
 window.open(url, '_blank');
}




}
