import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodService: FoodService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      if (params.searchTerm) {
        this.foods = this.foodService.getFoodBySearchTerm(params.searchTerm);
        console.log(this.foods);
      } else if (params.tag) {
        this.foods = this.foodService.retriveAllFoodByTagMethod(params.tag);
        console.log(this.foods);
      } else {
        this.foods = this.foodService.retrieveAllFoods();
      }
    });
  }

  ngOnInit(): void {
    // this.foods = this.foodService.retrieveAllFoods();
  }
}
