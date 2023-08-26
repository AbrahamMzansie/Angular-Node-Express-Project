import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodDetailsComponent } from './components/pages/food-details/food-details.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CheckOutComponent } from './components/pages/check-out/check-out.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { TrackOrderComponent } from './components/pages/track-order/track-order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'details/:foodId', component: FoodDetailsComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  {
    path: 'track-order/:orderId',
    component: TrackOrderComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
