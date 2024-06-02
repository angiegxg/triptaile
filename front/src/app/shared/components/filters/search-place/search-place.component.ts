import { Component, ViewEncapsulation, inject  } from '@angular/core';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../../../features/place/place.service';

@Component({
  selector: 'app-search-place',
  standalone: true,
  imports: [
    CommonModule,
    NzMentionModule,
    FormsModule
  ],
  styleUrls: ['./search-place.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search-place.component.html'
})
export class SearchPlaceComponent {
  inputValue: string = 'search Place';
  private readonly PlaceService = inject(PlaceService);
 

  onChange(value: string): void {
    console.log(value);
    this.PlaceService.searchByNamePlaceService(value)
  }

  
}
