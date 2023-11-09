import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import axios from 'axios';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  orderitems:any;
  constructor(cartService:CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private orderService: OrderService,
              private router: Router) {
                const cart = cartService.getCart();
                this.order.items = cart.cartItems;
                this.order.totalPrice = cart.totalPrice;

              }

  ngOnInit(): void {
    let {name, phone, email} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      phone:[phone, Validators.required],
      email:[email, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Заполните поля!', 'Некорректные данные!');
      return;
    }


    this.order.name = this.fc.name.value;
    this.order.phone = this.fc.phone.value;
    this.order.email = this.fc.email.value;

    this.orderService.create(this.order).subscribe({
      next:(order) => {
        this.order = order;

        const TOKEN="6288912772:AAEbWEEjGAsBYaGcXN1vWoQDOyHOs4UG59Y";
        const CHAT_ID="-1001980000285";
        const URI_API=`https://api.telegram.org/bot${TOKEN}/sendMessage`;

        console.log(this.toStr())
        axios.post(URI_API,{
          chat_id:CHAT_ID,
          parse_mode:`html`,
          text:this.toStr()
        })
        this.router.navigateByUrl('/home/payment');
      },
      error:(errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Cart');
      }
    })
  }

  toStr(){
    let message=`<b>ID заявки: </b>${this.order.id}\n<b>Имя клиента: </b>${this.order.name}\n<b>Телефон: </b>${this.order.phone}\n<b>Почта: </b>${this.order.email}\n<b>Общая стоимость: </b>${this.order.totalPrice} руб.\n\n<b>Список товаров: </b>\n`;
    for(var index = 0; index < this.order.items.length; index++) {
      message+=`<b>Товар:</b>\n`;
      message+=`<i>   ID: </i>${this.order.items[index].item.id}\n`;
      message+=`<i>   Наименование: </i>${this.order.items[index].item.name}\n`;
      message+=`<i>   Количество: </i>${this.order.items[index].quantity}\n`;
      message+=`<b>Варианты  исполнения:</b>\n`;
      if (this.order.items[index].coverage=='') message+=`<i>   Покрытие: </i>-\n`;
      else message+=`<i>   Покрытие: </i>${this.order.items[index].coverage}\n`;

      if (this.order.items[index].handle=='') message+=`<i>   Рукоять: </i>-\n`;
      else       message+=`<i>   Рукоять: </i>${this.order.items[index].handle}\n`;

      if (this.order.items[index].color=='') message+=`<i>   Цвет: </i>-\n`;
      else       message+=`<i>   Цвет: </i>${this.order.items[index].color}\n`;

      if (this.order.items[index].mod=='') message+=`<i>  Модификация: </i>-\n\n`;
      else       message+=`<i>   Модификация: </i>${this.order.items[index].mod}\n\n`;
      message+=`<i>   Суммарная надбавка за выбранные варианты исполнения: +</i>${this.order.items[index].bonus}руб.\n\n `;
    }
    return message;
  }
}

