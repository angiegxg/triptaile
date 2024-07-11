import { Component,  Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlaceService } from '../../../features/place/place.service';
import * as types from '../../types'
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { PostService } from '../../../features/post/post.service';



@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    RouterModule,
    NzIconModule
  ],
  templateUrl: './drop-down.component.html'
})
export class DropDownComponent {
  @Input() place!: types.Place;
  private  router=inject(Router)
  private readonly PlaceService = inject(PlaceService);
  private readonly PostService= inject(PostService)
  private activeRoute =inject(ActivatedRoute)
  public currentRoute!:string
  
  deletePlace(id: string) {
    this.currentRoute = this.activeRoute.snapshot.routeConfig?.path || '';
    if (this.currentRoute ===''){
      this.PlaceService.deletePlaceService(id).subscribe({
        next: response => {
          console.log('Place deleted:', response);
          this.router.navigate(['/welcome']); 
        },
        error: error => {
          console.error('Error deleting place:', error);
        }
      });

    }else{
      this.PostService.deletePostService(id).subscribe({
        next: response => {
          console.log('Place deleted:', response);
          this.router.navigate(['/welcome']); 
        },
        error: error => {
          console.error('Error deleting place:', error);
        }
      });


    }
}

edit(place:types.Place){
  this.currentRoute = this.activeRoute.snapshot.routeConfig?.path || '';
  if (this.currentRoute ===''){
    this.router.navigate(['/place/edit'], { state: { place: place } })
  }else{
    this.router.navigate(['/post/editpost'], { state: { mixedpost: place } });
}
}

}
