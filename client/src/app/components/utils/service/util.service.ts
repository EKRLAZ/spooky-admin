import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class UtilService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {

  }



  requireFacebookId(url: any) {
    return this.http.post<any>(`${this.API_URI}/util/facebook-id`, url)
  }

  requireYoutubeId(url: any) {
    return this.http.post<any>(`${this.API_URI}/util/youtube-id`, url)
  }
}
