import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { Order } from 'src/app/shared/models/Order';
import { Variant } from 'src/app/shared/models/Variant';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent implements OnInit {

  @Input()
  order!:Order;
  cart!:Cart;
  variant!:Variant[];
  constructor(private cartService:CartService) {
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart=cart;
    })
    this.cartService.getAllVariants().subscribe((variant)=>{
      this.variant=variant;
    })

  }


  ngOnInit(): void {
  }

}
