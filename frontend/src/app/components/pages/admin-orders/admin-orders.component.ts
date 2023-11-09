import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders:Order[]=[];

  constructor(private orderService:OrderService, activatedRoute:ActivatedRoute ) {
    let ordersObservable:Observable<Order[]>;

    activatedRoute.params.subscribe((params)=>{
      if(params.status){
        ordersObservable=this.orderService.getAllOrdersByStatus(params.status);
        }
      else
      ordersObservable=orderService.getAll();
      ordersObservable.subscribe((serverOrders) =>{
        this.orders = serverOrders;})
    })
  }
  ngOnInit(): void {
  }
  indexHidden:number=-1
}
