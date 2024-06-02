import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private readonly _http = inject(HttpClient);
  private readonly router = inject(Router);
  private uploadUrl = 'http://localhost:3000/api/upload'; // Cambia esta URL por la ruta de tu API donde se maneja la carga de archivos

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  
}
