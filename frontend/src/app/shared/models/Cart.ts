import { CartItem } from "./CartItem";

export class Cart{
    cartItems:CartItem[] = [];
    totalPrice : number = 0;
    totalCount : number = 0;
}