import {model, Schema, Types} from 'mongoose';
import { OrderStatus } from '../constants/order_status';
import { Item, ItemSchema } from './item.model';



export interface OrderItem{
    item: Item;
    price: number;
    quantity: number;
    coverage: string;
    handle: string;
    color: string;
    mod: string;
    bonus: number;
}

export const OrderItemSchema = new Schema<OrderItem>(
    {
        item:{type: ItemSchema, required: true},
        price:{ type: Number, required:true},
        quantity: {type: Number, required: true},
        coverage: {type: String},
        handle: {type: String},
        color: {type: String},
        mod: {type: String},
        bonus: {type: Number}
    }
);

export interface Order{
    id:string;
    items: OrderItem[];
    totalPrice:number;
    name: string;
    phone: string;
    email: string;
    status: OrderStatus;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date
  }

  const orderSchema = new Schema<Order>({
      name: {type: String, required: true},
      phone: {type: String, required: true},
      email: {type: String, required: true},
      totalPrice: {type: Number, required: true},
      items: {type: [OrderItemSchema], required: true},
      status: {type: String, default: OrderStatus.NEW},
      user: {type: Schema.Types.ObjectId, required: true}
  },{
      timestamps: true,
      toJSON:{
          virtuals: true
      },
      toObject:{
          virtuals: true
      }
  });

  export const OrderModel = model('order', orderSchema);