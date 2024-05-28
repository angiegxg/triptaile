import { Component, inject, OnInit } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component';
import { PlaceService } from '../../../services/place.service';
import { CommonModule } from '@angular/common';
import { FilterByProvidenceComponent } from '../../../shared/components/filters/filter-by-providence/filter-by-providence.component';
import { SearchPlaceComponent } from '../../../shared/components/filters/search-place/search-place.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent, 
    CommonModule,
    FilterByProvidenceComponent,
    SearchPlaceComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly placeService = inject(PlaceService);
  places = this.placeService.filteredPlaces

}
