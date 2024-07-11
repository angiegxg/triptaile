import { environment } from "../../../environments/environments.prod";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import * as type from "../../shared/types"
import { PlaceService } from "../place/place.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts = signal<type.Post[]>([]);
  public filteredPostsPublic= signal<type.Post[]>([]);
  public postsUser = signal<type.Post[]>([])
  public mixedPostsUser = signal<type.Place[]>([])
  private readonly _http = inject(HttpClient);
  private readonly placeService =inject (PlaceService)
  private readonly _url = `${environment.baseUrl}/post`;

  constructor() { 
    this.getPosts();
  
    
  }

  

  public getPosts(): void {
     this._http.get<type.Post[]>(`${this._url}`).pipe(
      tap((data: type.Post[]) => {
        this.posts.set(data);
      })
    ).subscribe();
  }

  public createPostService(post: type.Post){
    return this._http.post<type.Post>(`${this._url}`, post).pipe(
      tap((newPost: type.Post) => {
         this.postsUser.update(posts=>[...posts,newPost])
         this.posts.update(posts=>[...posts,newPost])      
      })
    );
  }

  getPostById(id:string){
    return this.posts().find(post => post._id === id)
  }

  public getPostPublicByPlace(id:string):type.Post[]{
     return this.posts().filter(post => post.place === id && post.private === false)
    
  }

  public getPostByUser(idUser: string): void {
    
    const postUser = this.posts().filter(post => post.idUser === idUser);
   
    const mixedPostPlace: type.Place[] = [];
  
    postUser.forEach(post => {
      if (typeof post.place === 'string') {
        const place = this.placeService.getPlaceById(post.place);
        if (place) {
          post.place = place;
        }
      }
      if (typeof post.place !== 'string') {
        const constructormixedPostPlace: type.Place = {
          _id: post._id,
          name: post.place.name,
          type: post.place.type,
          description: post.review,
          cover: post.cover,
          provincia: post.place.provincia,
          location: post.place.location,
          score: post.rate
        };
      
        mixedPostPlace.push(constructormixedPostPlace);
      }
    });
  
    this.mixedPostsUser.set(mixedPostPlace);
  }
  

  public updatePostService(post: type.User){
    return this._http.put<type.Post>(`${this._url}`, post)
    .pipe(
      tap((updatedUser: type.Post) => {
      this.postsUser.update(posts => {
        const index = posts.findIndex(u => u._id === updatedUser._id);
        posts[index] = updatedUser;
        return [...posts];
      })
      }),
      catchError(this.handleError)
    );
  }
  public deletePostService(id: string) {
    return this._http.delete<{ success: boolean }>(`${this._url}/${id}`).pipe(
      tap(response => {
        
          console.log(`Place with id ${id} deleted successfully.`);
          this.posts.update(posts => {
            const index = posts.findIndex(post => post._id === id);
            
            if (index !== -1) {
              posts.splice(index, 1);
            }
            console.log([...posts])
            return [...posts];
          });
        
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
     
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
 
}
