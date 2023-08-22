import { Component } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css'],
})
export class FoodDetailsComponent {
  food!: Food;
  constructor(activated: ActivatedRoute, foodService: FoodService ,private router:Router, private cartService:CartService) {
    activated.params.subscribe((params) => {
      if (params.foodId) {
     foodService.getFoodById(params.foodId).subscribe(serverData=>this.food = serverData);
      }
    });
  }

  addToCart(){
  this.cartService.addToCart(this.food);
  this.router.navigateByUrl("/cart")
  }
}
