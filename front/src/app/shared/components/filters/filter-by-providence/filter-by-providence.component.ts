import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../../../features/place/place.service';

@Component({
  selector: 'app-filter-by-providence',
  standalone: true,
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule
  ],
  templateUrl: './filter-by-providence.component.html',
  styleUrls: ['./filter-by-providence.component.css']
})
export class FilterByProvidenceComponent {
  selectedValue = null;
  buttonNearest = "nearest Places";
  private readonly PlaceService = inject(PlaceService);
  provinces = this.PlaceService.providencePlace()
  onProvinceChange(selectedProvince: string): void {
    console.log('Selected province:', selectedProvince);
    this.PlaceService.filterByProvincePlaceService(selectedProvince);
  }
  nearestPlace(){
    navigator.geolocation.getCurrentPosition((position) => {
      const location={        
        type: "Point",
        coordinates: [
          position.coords.latitude, position.coords.longitude
        ] as [number, number]   
      }
      
      this.PlaceService.nearestPlaceService(location)
      

    
    },
    (error) => {
      console.log(error)
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
  }
}
