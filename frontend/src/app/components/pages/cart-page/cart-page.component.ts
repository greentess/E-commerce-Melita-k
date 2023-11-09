import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItems';
import { UserService } from 'src/app/services/user.service';
import { Variant } from "src/app/shared/models/Variant";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!:Cart;
  quantity!: number;
  variant!:Variant[];
  constructor(private userService:UserService,private cartService:CartService) {
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart=cart;
    })
    this.cartService.getAllVariants().subscribe((variant)=>{
      this.variant=variant;
    })
    console.log(this.cart)
  }

  ngOnInit(): void {


  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.item.id, cartItem.coverage, cartItem.handle,cartItem.color, cartItem.mod)
  }

  changeQuantityMinus(cartItem:CartItem){
    let quantity = cartItem.quantity;
    if (cartItem.quantity!=1)
      quantity = cartItem.quantity-1;
    this.cartService.changeQuantity(cartItem.item.id, cartItem.coverage, cartItem.handle,cartItem.color, cartItem.mod, quantity);
  }
  changeQuantityPlus(cartItem:CartItem){
    const quantity = cartItem.quantity+1;
    this.cartService.changeQuantity(cartItem.item.id, cartItem.coverage, cartItem.handle,cartItem.color, cartItem.mod, quantity);
  }

  get isAuth(){
    return this.userService.getUserFromLocalStorage().token;
  }
}
