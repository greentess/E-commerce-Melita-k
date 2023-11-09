import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';
import { Observable } from 'rxjs';
import { Variant } from 'src/app/shared/models/Variant';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  item!: Item;

  items:Item[]=[];
  recommenditems:Item[]=[];
  recitem!: Item;

  vars_coverage?:Variant[]=[];
  vars_handle?:Variant[]=[];
  vars_color?:Variant[]=[];
  vars_mod?:Variant[]=[];

  coverage_index:number=0
  handle_index:number=0
  color_index:number=0
  mod_index:number=0

  constructor(activatedRoute:ActivatedRoute, itemService:ItemService,private cartService:CartService, private router:Router) {
    let recommendObservable:Observable<Item[]>;

    activatedRoute.params.subscribe((params)=>{
      if(params.id) itemService.getItembyId(params.id).subscribe(serverItem => {
        this.item = serverItem;

        this.vars_coverage = this.item.variants?.filter((value =>value.type==="Покрытие"))
        this.vars_handle = this.item.variants?.filter((value =>value.type==="Рукоять"))
        this.vars_color = this.item.variants?.filter((value =>value.type==="Цвет"))
        this.vars_mod = this.item.variants?.filter((value =>value.type==="Модификация"))
        console.log(this.vars_coverage)
        console.log(this.vars_handle)
        console.log(this.coverage_index)
        console.log(this.handle_index)
        if (this.item.tags!=null){
          recommendObservable=itemService.getAllItemsByTag(this.item.tags[0]);
          recommendObservable.subscribe((serverRecommendItems) =>{
            this.recommenditems = serverRecommendItems;})
          }
      });
    })
  }

  ngOnInit(): void {

  }

  readdesc(desc:string):String[]
  {
    let desc_mas:Array<String> = desc.split('<br>');
    return desc_mas;
  }



  addToCart(){
    console.log(this.item.variants)
/*
    let vars_coverage = this.item.variants?.filter((value =>value.type==="Покрытие"))
    let vars_handle = this.item.variants?.filter((value =>value.type==="Рукоять"))
    let vars_color = this.item.variants?.filter((value =>value.type==="Цвет"))
    let vars_mod = this.item.variants?.filter((value =>value.type==="Модификация"))
    */
    let color_name='';
    let mod_name='';
    let coverage_name='';
    let handle_name='';

    if (this.vars_color?.length==0) color_name=''
    else color_name = this.vars_color![this.color_index].name

    if (this.vars_mod?.length==0) mod_name=''
    else mod_name=this.vars_mod![this.mod_index].name

    if (this.vars_coverage?.length==0) coverage_name=''
    else coverage_name = this.vars_coverage![this.coverage_index].name

    if (this.vars_handle?.length==0) handle_name=''
    else handle_name=this.vars_handle![this.handle_index].name

    console.log(this.vars_coverage![this.coverage_index]);
    console.log(this.coverage_index);
    console.log(this.vars_handle![this.handle_index]);
    console.log(this.handle_index);
    console.log(this.vars_color![this.color_index]);
    console.log(this.vars_mod![this.mod_index]);

    this.cartService.addToCart(this.item, coverage_name, handle_name,color_name,mod_name);
    this.router.navigateByUrl('/home/cart-page');
  }


  isEmpty(arr:any) {
    let count:number =0;

    for(var i=0; i<arr.length; i++) {
      if(arr[i] === "" ||arr[i] === " " || arr[i]===undefined)
        count=count+1;
    }
    //console.log(count,arr.length)
    if (count===arr.length){
    return true;
    }
    else
    {
      return false;
    }
  }

  isNo(arr:any) {
    if (arr.length===1)
    return true;
    else
      return false;
  }

  isEmptymas(arr:any) {
    let count:number=1;
    let countmas:number=0;
    for(var i=0; i<arr.length; i++) {
      for(var j=0; j<arr[i].length; j++){
        if(arr[j] === "" ||arr[j] === " " || arr[j]===undefined)
          count=count+1;
        countmas=countmas+1;
        }
    }
    //console.log(count,countmas)

    if (count===countmas){
    return true;
    }
    else
    {
      return false;
    }
  }
}
