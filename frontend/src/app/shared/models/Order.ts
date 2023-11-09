import { CartItem } from "./CartItems";
import { LatLng } from "leaflet";

export class Order{
  id!:number;
  items!: CartItem[];
  totalPrice!:number;
  name!: string;
  address!: string;
  addressLatLng?:LatLng;
  createdAt!: string;
  status!: string;
  phone!: string;
  email!: string;
}
