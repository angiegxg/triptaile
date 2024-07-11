// import { environment } from "../../environments/environments";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import * as type from "../../shared/types"
import { NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = signal<type.User | null>(null)
  public token = signal<String | null>(null)
  public usersAdmin = signal<type.User[]>([])
  private readonly _http = inject(HttpClient);
  private readonly router = inject(Router);
  private message= inject(NzMessageService) 
  private readonly _url = "http://localhost:3000/user";
  private tokenKey = 'authorization'
  constructor() { 

  }

  public getUsers(): void {
     this._http.get<type.User[]>(`${this._url}`)
     .pipe(tap((data: type.User[]) => {
      this.usersAdmin.set(data)
    }))
    .subscribe();
  }

  public loginService(user: type.Login) {
    return this._http.post<type.ResponseLogin>(`${this._url}/login`, user).subscribe({
            next: (_data) => {
              this.user.set(_data.exists.user);
              localStorage.setItem(this.tokenKey, _data.exists.token)
              this.message.create("success", `Welcome ${_data.exists.user.nickname}`)

              this.router.navigate(['/welcome'])
            },
            error: (err) => {
              this.message.create("error", `ERROR login: ${err.message }`)
            }
          });
      
  }

  public getUserByToken(){
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            return this._http.get<type.User>(`${this._url}/getuserbytoken`).subscribe({
        next: (_data) => {
          
          
          this.user.set(_data);
         
        },
        error: (err) => {
          this.message.create("error", `ERROR login: ${err.message }`)
        }
      });
    }
    return
  }

  public getUserById(id: string) {
    return this._http.get<type.User>(`${this._url}/${id}`);
  }

  public logOutService() {
    this.user.set(null);
    localStorage.removeItem(this.tokenKey);
        
      }

  public isAuthService(){
   
    return this.user.length>0;
  }

  public getTokenService(){

   
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(this.tokenKey);
      }
      return null;
    }

    public registerUserService(user: type.UserRegister){
      return this._http.post<type.ResponseLogin>(`${this._url}/newuser`, user).pipe(
        tap((data: type.ResponseLogin) => {
         
          this.message.create("success", `Welcome ${data.exists.user.nickname}`)
          this.router.navigate(['/welcome'])
        })
      );
    }

    public updateUserService(user: type.User){
      return this._http.put<type.User>(`${this._url}`, user)
      .pipe(
        tap((updatedUser: type.User) => {
        this.usersAdmin.update(users => {
          const index = users.findIndex(u => u._id === updatedUser._id);
          users[index] = updatedUser;
          return [...users];
        })
        }),
        catchError(this.handleError)
      );
    }

    

    public deleteUserService(id: string) {
      return this._http.delete<{ success: boolean }>(`${this._url}/${id}`).pipe(
        tap(response => {
          this.message.create("success", `Place with id ${id} deleted successfully.`)
            this.usersAdmin.update(users => {
              const index = users.findIndex(place => place._id === id);
              
              if (index !== -1) {
                users.splice(index, 1);
              }
              
              return [...users];
            });
          
        })
      );
    }

    private handleError(error: HttpErrorResponse) {
      
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        errorMessage = `Server-side error: ${error.status} - ${error.message}`;
      }
     
      return throwError(errorMessage);
    }
  }
    
    
  




