import { Component, Input , inject} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { DropDownComponent } from '../drop-down/drop-down.component';
import * as types from '../../types'
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../features/user/user.service';
import { NgOptimizedImage } from '@angular/common';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NzCardModule,
    CommonModule,
    DropDownComponent,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() place!: types.Place ;
  public readonly userService =inject(UserService)
  private readonly router=inject(Router)
  private activeRoute =inject(ActivatedRoute)
  public isAdmin=this.userService.user
  public currentRoute!:string

  constructor() {
    this.currentRoute = this.activeRoute.snapshot.routeConfig?.path || '';
   }

   handleNewPostClick(event: MouseEvent) {
    
    event.stopPropagation();
    
    this.router.navigate(['/post/newpost'], { state: { mixedpost: this.place } });
  }

  goToDetail(place: types.Place): void {
    
    
   
   


    if (this.currentRoute ===''){

      this.router.navigate(['/detail'], { state: { detail: place } });
      }else{
        this.router.navigate(['/post/editpost'], { state: { mixedpost: place } });
      }
  }
 
}
