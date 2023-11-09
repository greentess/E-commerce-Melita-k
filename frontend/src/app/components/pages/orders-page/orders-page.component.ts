import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {
  orders:Order[]=[];
  constructor( orderService:OrderService, router: Router) {

    orderService.getAllOrdersByUser().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error:() => {
        router.navigateByUrl('/home');
      }
    })
  }

  indexHidden:number=-1


  ngOnInit(): void {
  }

}
