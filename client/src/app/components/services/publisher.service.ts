import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publisher } from 'src/app/shared/models/publisher.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  API_URI = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }


  get() {
    return this.http.get<Publisher[]>(`${this.API_URI}/publishers`) as Observable<Publisher[]>
  }

  create(publisher: any) {
    return this.http.post(`${this.API_URI}/publishers`, publisher)
  }
}
