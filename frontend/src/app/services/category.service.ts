import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Category} from '../shared/models/Category';
import { ITEMS_CATEGORIES_URL } from '../shared/constants/urls';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(ITEMS_CATEGORIES_URL);
  }
}
