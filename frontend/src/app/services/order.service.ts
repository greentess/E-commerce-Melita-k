import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL,ORDERS_BY_USER_URL, ORDERS_URL, ORDERS_STATUS_URL, ORDERS_BY_STATUS_URL, TG_CREATE_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';
import { Status } from '../shared/models/Status';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders!: Observable<Order[]> | String;


  constructor(private http: HttpClient) { }

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  telegram(order:Order){
    return this.http.post<Order>(TG_CREATE_URL, order);
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  getAllOrdersByUser():Observable<Order[]>{
    return this.http.get<Order[]>(ORDERS_BY_USER_URL);
  }

  getAll():Observable<Order[]>{
    // return sample_items;
    return  this.http.get<Order[]>(ORDERS_URL);
  }

  getAllStatuses():Observable<Status[]>{
    const res=this.http.get<Status[]>(ORDERS_STATUS_URL);
    console.log(res);
    return res
  }
    getAllOrdersByStatus(status:string):Observable<Order[]>{
    return status =="Все"?
    this.getAll():
    this.http.get<Order[]>(ORDERS_BY_STATUS_URL + status);
  }

}
