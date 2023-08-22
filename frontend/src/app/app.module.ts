import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RatingModule } from 'ng-starrating';
import { NgxStarRatingModule } from 'ngx-star-rating';

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
    NotFoundComponent ,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStarRatingModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
