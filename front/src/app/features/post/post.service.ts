import { environment } from "../../../environments/environments.development";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from "rxjs";
import * as type from "../../shared/types"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts = signal<type.Post[]>([]);
  public filteredPosts= signal<type.Post[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _url = environment.url;

  constructor() { 
    this.getPosts();
    console.log("estoy en el constructor del servicio post",this.posts)
    
  }

  

  public getPosts(): Observable<type.Post[]> {
    return this._http.get<type.Post[]>(`http://localhost:3000/post/`).pipe(
      tap((data: type.Post[]) => {
        this.posts.set(data);
        this.filteredPosts.set(data);
        console.log("estoy en get post", data);
      })
    );
  }

  public getPostPublicByPlace(id:string):type.Post[]{
    return this.posts().filter(post => post.place === id && post.private === false)
    
  }

  public getPostByUser(idUser:string):type.Post[]{
    return this.posts().filter(post => post.idUser === idUser)
  }
 
}
