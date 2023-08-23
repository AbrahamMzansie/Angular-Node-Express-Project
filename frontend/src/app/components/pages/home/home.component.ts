import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodService: FoodService, route: ActivatedRoute) {
    let foodObservable: Observable<Food[]>;
    route.params.subscribe((params) => {
      if (params.searchTerm) {
        foodObservable = this.foodService.getFoodBySearchTerm(
          params.searchTerm
        );
      } else if (params.tag) {
        foodObservable = this.foodService.retriveAllFoodByTagMethod(params.tag);
      } else {
        foodObservable = this.foodService.retrieveAllFoods();
      }
      foodObservable.subscribe((serverFoods) =>{
       
        this.foods = serverFoods
      } );
    });
  }

  ngOnInit(): void {
    // this.foods = this.foodService.retrieveAllFoods();
  }
}
