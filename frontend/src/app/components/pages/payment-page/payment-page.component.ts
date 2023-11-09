import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import axios from 'axios';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class PaymentPageComponent implements OnInit {


  order:Order = new Order();

  constructor(orderService: OrderService, router: Router) {
      orderService.getNewOrderForCurrentUser().subscribe({
        next: (order) => {
          this.order = order;
          console.log(order.items)

/*           const TOKEN="6288912772:AAEbWEEjGAsBYaGcXN1vWoQDOyHOs4UG59Y";
          const CHAT_ID="-1001980000285";
          const URI_API=`https://api.telegram.org/bot${TOKEN}/sendMessage`;

          let message=`Заявка с сайта!</b>\n`;
          message+=`<b>ID: </b>${this.order.id}\n`;
          message+=`<b>Отправитель: </b>${this.order.name}\n`;
          message+=`<b>Телефон: </b>${this.order.phone}\n`;
          message+=`<b>Почта: </b>${this.order.email}\n`;
          console.log(message)
          axios.post(URI_API,{
            chat_id:CHAT_ID,
            parse_mode:`html`,
            text:`<b>ID: </b>${this.order.id}\n<b>Имя клиента: </b>${this.order.name}\n<b>Телефон: </b>${this.order.phone}\n<b>Почта: </b>${this.order.email}\n`
          }) */
        },
        error:() => {
          router.navigateByUrl('/home/checkout');
        }
      })
   }

  ngOnInit(): void {
  }

}
