import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart!: Cart;

  constructor(private cartService: CartService) {
    this.cartService
      .getCartObservable()
      .subscribe((cart) => (this.cart = cart));
  }

  removeCartItem(cartItem: CartItem): void {
    this.cartService.removeCartItem(cartItem.food.id);
  }
  changeQuantity(cartItem: CartItem, qty: string) {
    const newQty = parseInt(qty);
    this.cartService.changeQuantity(cartItem.food.id, newQty);
  }
}
