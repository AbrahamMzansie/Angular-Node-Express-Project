import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css'],
})
export class FoodDetailsComponent {
  food!: Food;
  constructor(activated: ActivatedRoute, foodService: FoodService) {
    activated.params.subscribe((params) => {
      if (params.foodId) {
        this.food = foodService.getFoodById(params.foodId);
      }
    });
  }
}
