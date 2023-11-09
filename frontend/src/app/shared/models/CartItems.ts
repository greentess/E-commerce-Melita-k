import { Item } from "./Item";


export class CartItem{

  constructor(public item:Item,public bonus:number,public coverage:string,public handle:string,public color:string,public mod:string){ }
  quantity:number=1;
  price: number=this.item.price+this.bonus;

}
