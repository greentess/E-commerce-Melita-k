import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItems';
import { Item } from '../shared/models/Item';
import { Variant } from '../shared/models/Variant';
import { HttpClient } from '@angular/common/http';
import { VARIANTS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart>= new BehaviorSubject(this.cart);

  private variants?:Variant[];

  constructor(private http:HttpClient) {
    this.getAllVariants().subscribe(serverVariants => {
      this.variants = serverVariants;
  });
  }

  addToCart(item:Item, choice_coverage:string, choice_handle:string,choice_color:string,choice_mod:string):void{
    let cartItem=this.cart.cartItems.find(cartItem => cartItem.item.id===item.id && cartItem.coverage==choice_coverage && cartItem.handle==choice_handle && cartItem.color==choice_color && cartItem.mod==choice_mod)
    if (cartItem)
      return;

    console.log(this.variants)

    let bonus=0;

    let varr_handle;
    let varr_coverage;
    let varr_mod;
    let varr_color;

    let varr_coverage_ant=this.variants?.find(variant =>variant.name==="Антиблик" );
    let varr_coverage_kam=this.variants?.find(variant =>variant.name==="Камуфляж" );
    let varr_coverage_ch=this.variants?.find(variant =>variant.name==="Хром" );


    if(choice_coverage=="Антиблик" && varr_coverage_ant!=undefined)
    {
      if(varr_coverage_ant?.bonus!=undefined)
        bonus=bonus + varr_coverage_ant.bonus;
      else {
        let varr=item.variants?.find(variant =>variant.name==="Антиблик" );
        if (varr?.bonus!=undefined)
          bonus=bonus + varr.bonus;
      }
    }

    console.log(choice_coverage,varr_coverage_kam,varr_coverage_kam?.bonus)
    if(choice_coverage=="Камуфляж" && varr_coverage_kam!=undefined)
    {
      if(varr_coverage_kam?.bonus!=undefined)
        bonus=bonus + varr_coverage_kam.bonus;
      else {
        let varr=item.variants?.find(variant =>variant.name==="Камуфляж" );
        if (varr?.bonus!=undefined)
          bonus=bonus + varr.bonus;
      }
      console.log(bonus)
    }

    if(choice_coverage=="Хром" && varr_coverage_ch!=undefined)
    {
      if(varr_coverage_ch?.bonus!=undefined)
        bonus=bonus + varr_coverage_ch.bonus;
      else {
        let varr=item.variants?.find(variant =>variant.name==="Хром" );
        if (varr?.bonus!=undefined)
          bonus=bonus + varr.bonus;
      }
    }



    let varr_handle_r=item.variants?.find(variant =>variant.name==="Резина" );
    let varr_handle_k=item.variants?.find(variant =>variant.name==="Кожа" );

    if(choice_handle=="Резина" && varr_handle_r!=undefined)
    {
      if(varr_handle_r?.bonus!=undefined)
        bonus=bonus + varr_handle_r.bonus;
      else if(varr_handle_r?.bonus==undefined)
      {
        let varr=this.variants?.find(variant =>variant.name==="Резина" );
        if (varr?.bonus!=undefined)
          bonus=bonus + varr.bonus;
      }
    }

    if(choice_handle=="Кожа" && varr_handle_k!=undefined)
    {
      if(varr_handle_k?.bonus!=undefined)
        bonus=bonus + varr_handle_k.bonus;
      else if(varr_handle_k?.bonus==undefined)
      {
        let varr=this.variants?.find(variant =>variant.name==="Кожа" );
        if (varr?.bonus!=undefined)
          bonus=bonus + varr.bonus;
      }
    }



    this.cart.cartItems.push(new CartItem(item,bonus,choice_coverage,choice_handle,choice_color,choice_mod));

    this.setCartToLocalStorage();
  }

  removeFromCart(itemId:string, choice_coverage:string, choice_handle:string, choice_color:string,choice_mod:string):void{
    let delete_cartItem=this.cart.cartItems.find(cartItem =>cartItem.item.id===itemId && cartItem.coverage==choice_coverage && cartItem.handle==choice_handle && cartItem.color==choice_color && cartItem.mod==choice_mod);
    this.cart.cartItems=this.cart.cartItems.filter(cartItem => (cartItem!=delete_cartItem));
    this.setCartToLocalStorage();
  }

  changeQuantity(itemId:string, choice_coverage:string, choice_handle:string,choice_color:string,choice_mod:string, quantity:number){

    let cartItem=this.cart.cartItems.find(cartItem =>cartItem.item.id===itemId&& cartItem.coverage==choice_coverage && cartItem.handle==choice_handle&& cartItem.color==choice_color && cartItem.mod==choice_mod);
    if(!cartItem) return;

    cartItem.quantity=quantity;

    cartItem.price=quantity*(cartItem.item.price + cartItem.bonus);


    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart=new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private  setCartToLocalStorage():void{
    this.cart.totalPrice=this.cart.cartItems.reduce((prevSum,currentCartItem)=>prevSum+currentCartItem.price,0)
    this.cart.totalCount=this.cart.cartItems.reduce((prevSum,currentCartItem)=>prevSum+currentCartItem.quantity,0)

    const cartJson=JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson)
    this.cartSubject.next(this.cart);
  }

  private  getCartFromLocalStorage():Cart{
    const cartJson=localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson):new Cart();
  }


  getAllVariants():Observable<Variant[]>{
    return this.http.get<Variant[]>(VARIANTS_URL);
  }
}
