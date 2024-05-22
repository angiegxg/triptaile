import { environment } from "../../environments/environments";
import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs";
import * as type from "../shared/types"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor() { }
}
