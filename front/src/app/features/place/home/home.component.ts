import { Component, inject, OnInit } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component';
import { PlaceService } from '../place.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterByProvidenceComponent } from '../../../shared/components/filters/filter-by-providence/filter-by-providence.component';
import { SearchPlaceComponent } from '../../../shared/components/filters/search-place/search-place.component';
import { UserService } from '../../user/user.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent, 
    CommonModule,
    FilterByProvidenceComponent,
    SearchPlaceComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly placeService = inject(PlaceService);
  private readonly userService = inject(UserService);
  places = this.placeService.filteredPlaces
  isAdmin=this.userService.user()?.role

}
