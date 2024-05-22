import { Component, inject, OnInit } from '@angular/core'
import { CardComponent } from '../../../shared/components/card/card.component';
import { PlaceService } from '../../../services/place.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly placeService = inject(PlaceService);
  places = this.placeService.places

}
