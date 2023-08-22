import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor() {}

  retrieveAllFoods(): Food[] {
    return sample_foods;
  }

  getFoodBySearchTerm(searchTerm: string): Food[] {
    return this.retrieveAllFoods().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  }

  getFoodById(foodId: string): Food {
    return (
      this.retrieveAllFoods().find((food) => food.id === foodId) ?? new Food()
    );
  }

  retriveAllTags(): Tag[] {
    return sample_tags;
  }

  retriveAllFoodByTagMethod(tagName: string): Food[] {
    return tagName === 'All'
      ? this.retrieveAllFoods()
      : this.retrieveAllFoods().filter((food) => food?.tags?.includes(tagName));
  }
}
