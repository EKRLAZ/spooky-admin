import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Podcasts } from 'src/app/shared/models/podcasts.interface';

import { v4 as uuidv4 } from 'uuid';

import  { type }  from "../../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class PodcasterService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  podcasters() {
    return this.http.get<Podcasts[]>(`${this.API_URI}/podcasts`)
  }

  createPodcaster(podcaster: Podcasts) {
   

    return this.http.post(`${this.API_URI}/podcasts`, podcaster)
  }


  requesFacebookId(url: any) {
    return this.http.post<any>(`${this.API_URI}/podcasts/facebook-id`, url)
  }

  requesYoutubeId(url: any) {
    return this.http.post<any>(`${this.API_URI}/podcasts/youtube-id`, url)
  }

}


