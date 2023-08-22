import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  qty: number = 0;

  constructor(private cartService: CartService) {
    this.cartService
      .getCartObservable()
      .subscribe((cart) => (this.qty = cart.totalCount));
  }
}
