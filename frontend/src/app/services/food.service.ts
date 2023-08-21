import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  retrieveAllFoods(): Food[] {
    return sample_foods;
  }

  getFoodBySearchTerm(searchTerm: string):Food[] {
    return this.retrieveAllFoods().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  }
}
