import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  API_URI = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }


  get() {
    return this.http.get<Category[]>(`${this.API_URI}/categories`) as Observable<Category[]>
  }

  create(publisher: any) {
    return this.http.post(`${this.API_URI}/categories`, publisher)
  }

}
