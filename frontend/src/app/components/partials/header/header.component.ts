import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  qty: number = 0;
  user!: User;

  constructor(
    private cartService: CartService,
    private userService: UsersService
  ) {
    this.cartService
      .getCartObservable()
      .subscribe((cart) => (this.qty = cart.totalCount));

    this.userService.userObservable.subscribe((newUser) => {
      console.log(newUser);
      this.user = newUser;
    });
  }
  logOut() {
    this.userService.logout();
  }
}
