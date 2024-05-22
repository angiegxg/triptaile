import { environment } from "../../environments/environments";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs";
import * as type from "../shared/types"

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  public places = signal<type.Place[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _url = environment.url;

  constructor() { 
    this.getUsers();
  }

  public getUsers(): void {
    this._http
      .get<type.Place[]>(`${this._url}`)
      .pipe(tap((data: type.Place[]) => this.places.set(data)))
      .subscribe();
  }


    public updatePlace(place: type.Place): Observable<type.Place> {
      return this._http.put<type.Place>(`${this._url}/editplace`, place).pipe(
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
    
       
        
      }
   
