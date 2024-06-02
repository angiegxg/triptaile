import { Component,  Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule } from '@angular/router';
import { PlaceService } from '../../../features/place/place.service';
import * as types from '../../types'
import { Router } from '@angular/router';



@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [
    CommonModule,
    NzDropDownModule,
    RouterModule
  ],
  templateUrl: './drop-down.component.html'
})
export class DropDownComponent {
  @Input() place!: types.Place;
  private  router=inject(Router)
  private readonly PlaceService = inject(PlaceService);
  deletePlace(id: string) {
    console.log("estoy en la función delete de drop-down");
    this.PlaceService.deletePlaceService(id).subscribe({
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
