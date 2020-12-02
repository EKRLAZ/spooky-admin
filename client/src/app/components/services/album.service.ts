import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from 'src/app/shared/models/album.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }


  get() {
    return this.http.get<Album[]>(`${this.API_URI}/albums`) as Observable<Album[]>
  }

  create(album: any) {
    return this.http.post(`${this.API_URI}/albums`, album)
  }
}
