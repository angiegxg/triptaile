import { environment } from "../../environments/environments";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs";
import { Router } from "@angular/router";
import * as type from "../shared/types"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = signal<type.User | null>(null)
  public token = signal<String | null>(null)
  private readonly _http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly _url = "http://localhost:3000/user/login";
  private tokenKey = 'auth_token'
  constructor() { 

  }

  public loginService(user: type.Login): Observable<type.ResponseLogin> {
    return this._http.post<type.ResponseLogin>(`${this._url}`, user).pipe(
      tap((data: type.ResponseLogin) => {
        this.user.set(data.exists.user);
        localStorage.setItem(this.tokenKey, data.exists.token)
        
        this.router.navigate(['/welcome'])
      })
    );
  }

  public logOutService() {
    this.user.set(null);
        
      }

  public isAuthService(){
    console.log(this.user.length>0)
    return this.user.length>0;
  }

  public getTokenService(){

   
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('token');
      }
      return null;
    }
    
  }




