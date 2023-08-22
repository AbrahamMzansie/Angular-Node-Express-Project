import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  addToCart(food: Food) {
    let cartItem = this.cart.cartItems.find(
      (items) => items.food.id === food.id
    );
    if (cartItem) {
      return;
    } else {
      this.cart.cartItems.push(new CartItem(food));
      this.setCartToLocalStorage();
    }
  }

  removeCartItem(foodId: string): void {
    this.cart.cartItems = this.cart.cartItems.filter(
      (item) => item.food.id != foodId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number): void {
    let cartItem = this.cart.cartItems.find(
      (items) => items.food.id === foodId
    );
    if (!cartItem) {
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }
  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.cartItems.reduce(
      (acc, currentItem) => acc + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.cartItems.reduce(
      (acc, currentItem) => acc + currentItem.quantity,
      0
    );
    const cartJSON = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartJSON);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJSON = localStorage.getItem('cart');
    return cartJSON ? JSON.parse(cartJSON) : new Cart();
  }
}
