import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  retrieveAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getFoodBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }

  retriveAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  retriveAllFoodByTagMethod(tagName: string): Observable<Food[]> {
    return tagName === 'All'
      ? this.retrieveAllFoods()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tagName);
  }
}
