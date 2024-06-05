// import { environment } from "../../environments/environments";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs";
import { Router } from "@angular/router";
import * as type from "../../shared/types"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = signal<type.User | null>(null)
  public token = signal<String | null>(null)
  public usersAdmin = signal<type.User[]>([])
  private readonly _http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly _url = "http://localhost:3000/user";
  private tokenKey = 'auth_token'
  constructor() { 

  }

  public getUsers(): void {
     this._http.get<type.User[]>(`${this._url}`)
     .pipe(tap((data: type.User[]) => {
      this.usersAdmin.set(data)
      console.log("estos son los users", data)
    }))
    .subscribe();
  }

  public loginService(user: type.Login): Observable<type.ResponseLogin> {
    return this._http.post<type.ResponseLogin>(`${this._url}/login`, user).pipe(
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

    public registerUserService(user: type.UserRegister){
      return this._http.post<type.ResponseLogin>(`${this._url}/newuser`, user).pipe(
        tap((data: type.ResponseLogin) => {
          console.log("Esta es la repuesta de registrar el usuario",data)
          
          this.router.navigate(['/welcome'])
        })
      );
    }

    public updateUserService(user: type.User){
      return this._http.put<type.User>(`${this._url}`, user).pipe(
        tap((updatedUser: type.User) => {
        this.usersAdmin.update(users => {
          const index = users.findIndex(u => u._id === updatedUser._id);
          users[index] = updatedUser;
          return [...users];
        })
          
          this.router.navigate(['/welcome'])
        })
      );
    }

    public deleteUserService(id: string) {
      return this._http.delete<{ success: boolean }>(`${this._url}/${id}`).pipe(
        tap(response => {
          
            console.log(`Place with id ${id} deleted successfully.`);
            this.usersAdmin.update(users => {
              const index = users.findIndex(place => place._id === id);
              
              if (index !== -1) {
                users.splice(index, 1);
              }
              console.log([...users])
              return [...users];
            });
          
        })
      );
    }
    
    
  }




