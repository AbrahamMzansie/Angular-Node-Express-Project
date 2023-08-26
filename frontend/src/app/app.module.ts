import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { FoodDetailsComponent } from './components/pages/food-details/food-details.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckOutComponent } from './components/pages/check-out/check-out.component';
import { OrderItemsComponent } from './components/partials/order-items/order-items.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { TrackOrderComponent } from './components/pages/track-order/track-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodDetailsComponent,
    TagsComponent,
    CartComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterComponent,
    LoadingComponent,
    CheckOutComponent,
    OrderItemsComponent,
    MapComponent,
    PaymentComponent,
    PaypalButtonComponent,
    TrackOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStarRatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
