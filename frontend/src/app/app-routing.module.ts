import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodDetailsComponent } from './components/pages/food-details/food-details.component';
import { CartComponent } from './components/pages/cart/cart.component';

const routes: Routes = [
  {path : "" , component : HomeComponent},
  {path : "search/:searchTerm" , component : HomeComponent},
  {path : "details/:foodId" , component : FoodDetailsComponent},
  {path : "tag/:tag" , component : HomeComponent},
  {path : "cart" , component : CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
