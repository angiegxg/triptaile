import { environment } from "../../../environments/environments";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter} from "rxjs";
import * as type from "../../shared/types"
import { NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  public places = signal<type.Place[]>([]);
  public filteredPlaces= signal<type.Place[]>([]);
  public providencePlace= signal<string[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _url = environment.baseUrl;
  private message= inject(NzMessageService) 

  constructor() { 
    this.getPlaces();
    this.getProvidencePlaceService();
  }

  public getPlaces(): void {
    this._http
      .get<type.Place[]>(`${this._url}/places`)
      .pipe(tap((data: type.Place[]) => {
        this.places.set(data)
        this.filteredPlaces.set(data)
      }))
      .subscribe();
  }

  public createPlaceService(place: type.Place): Observable<type.Place> {
    return this._http.post<type.Place>(`${this._url}/places/newplace`, place).pipe(
      tap(newPlace => {
        
          return this.places.update(places => [...places, newPlace]);
        })
      )}
    
  

    public updatePlace(place: type.Place): Observable<type.Place> {
      return this._http.put<type.Place>(`${this._url}/places/editplace`, place).pipe(
        tap(updatedPlace => {
          this.places.update(places => {
            const index = places.findIndex(place => place._id === updatedPlace._id);
            if (index !== -1) {
              places[index] = updatedPlace;
            }
            return [...places];
          });
        })
      );
    }

    public deletePlaceService(id: string) {
      return this._http.delete<{ success: boolean }>(`${this._url}/places/${id}`).pipe(
        tap(response => {
          
          this.message.create("success", `Place with id ${id} deleted successfully.`)
            this.places.update(places => {
              const index = places.findIndex(place => place._id === id);
              
              if (index !== -1) {
                places.splice(index, 1);
              }
              
              return [...places];
            });
          
        })
      );
    }

    public searchByNamePlaceService(name:string){
      if (!name.trim()) {
        this.filteredPlaces.set(this.places());
        return;
      }
    
      const searched = this.places().filter(place => 
        place.name.toLowerCase().includes(name.toLowerCase())
      );
      this.filteredPlaces.set(searched);
  }

  private getProvidencePlaceService(){
    const provinceSet = new Set<string>();
    this.places().forEach(place => {
      provinceSet.add(place.provincia);
    });
    this.providencePlace.set(Array.from(provinceSet));
  
  }
  
  public filterByProvincePlaceService(provincia: string): void {
    if (provincia === null) {
      this.filteredPlaces.set(this.places());
      return;
    }
    const filtered = this.places().filter(place => place.provincia === provincia);
    this.filteredPlaces.set(filtered);
  }

  public nearestPlaceService(location:type.Location): void {
    this._http.post<type.Place[]>(`${this._url}/places/nearestplaces`, location).pipe(tap((data: type.Place[]) => {
      
      this.filteredPlaces.set(data)
    }))
    .subscribe();
    
  }
  public getPlaceById(id:string): type.Place | undefined {
    const place=this.places().find(place => place._id! === id)
    return place 
  }

  }

    

    
    
       
        
      
   
