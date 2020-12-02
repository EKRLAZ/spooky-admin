import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Serie } from 'src/app/shared/models/serie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Serie[]>(`${this.API_URI}/series`) as Observable<Serie[]>
  }

  
  create(data: Serie) {
    return this.http.post(`${this.API_URI}/series`, data)
  }

}
