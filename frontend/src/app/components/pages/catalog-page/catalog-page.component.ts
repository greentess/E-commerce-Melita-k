import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concat } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';
import { SortPipe } from './sort.pipe';
import { ChangeContext, LabelType, Options } from 'ng5-slider';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { BehaviorSubject,  filter } from 'rxjs';

import { filters, defaults_filters } from 'src/app/shared/interfaces/IFilters';
/* interface filters {
  dlina_ob:Array<number>;
  dlina_kl:Array<number>;
  shirina_kl:Array<number>;
  tolchina:Array<number>;

  chrome:boolean;
  camou:boolean;
  anti:boolean;

  koza:boolean;
  rezina:boolean;
  derevo:boolean;

} */
/* const defaults_filters: Pick<filters,'dlina_ob' | 'dlina_kl'|'shirina_kl' | 'tolchina'|'chrome' | 'camou'|'anti' | 'koza'|'rezina' | 'derevo'> = {
  dlina_ob:[100,500],
  dlina_kl:[50,300],
  shirina_kl:[0,100],
  tolchina:[1,6],

  chrome:false,
  camou:false,
  anti:false,

  koza:false,
  rezina:false,
  derevo:false
} */

@Component({
  selector: 'app-home',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  public  all_filters: filters = this.itemService.getFiltersFromLocalStorage();


  items:Item[]=[];
  filter_items:Item[]=[];
  mytag="Все";
  selectedField:string = 'id';
  field: any;

  const_dk:any;
  const_od:any;
  const_sh:any;
  const_to:any;

  const_check_chrome:boolean=this.all_filters.chrome;
  const_check_camou:boolean=this.all_filters.camou;
  const_check_anti:boolean=this.all_filters.anti;

  const_check_rez:boolean=this.all_filters.rezina;
  const_check_koz:boolean=this.all_filters.koza;
  const_check_der:boolean=this.all_filters.derevo;

//Цена
  minValue: number = 0;
  maxValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>От: </b>' + value +' руб';
        case LabelType.High:
          return '<b>До: </b>' + value+' руб';
        default:
          return  value + ' руб';
      }
    }
  };


//Длина клинка
  min_dk: number = this.all_filters.dlina_kl[0];
  max_dk: number = this.all_filters.dlina_kl[1];
  options_dk: Options = {
    floor: 50,
    ceil: 300,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>От: </b>' + value +' мм';
        case LabelType.High:
          return '<b>До: </b>' + value+' мм';
        default:
          return  value + ' мм';
      }
    }
  };
//Общая длина
min_od: number = this.all_filters.dlina_ob[0];
max_od: number = this.all_filters.dlina_ob[1];
options_od: Options = {
  floor: 100,
  ceil: 500,
  translate: (value: number, label: LabelType): string => {
    switch (label) {
      case LabelType.Low:
        return '<b>От: </b>' + value +' мм';
      case LabelType.High:
        return '<b>До: </b>' + value+' мм';
      default:
        return  value + ' мм';
    }
  }
};
  //Ширина клинка
  min_sh: number = this.all_filters.shirina_kl[0];
  max_sh: number = this.all_filters.shirina_kl[1];
  options_sh: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>От: </b>' + value +' мм';
        case LabelType.High:
          return '<b>До: </b>' + value+' мм';
        default:
          return  value + ' мм';
      }
    }
  };

    //Толщина обуха
    min_to: number = this.all_filters.tolchina[0];
    max_to: number = this.all_filters.tolchina[1];
    options_to: Options = {
      floor: 1,
      ceil: 6,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>От: </b>' + value +' мм';
          case LabelType.High:
            return '<b>До: </b>' + value+' мм';
          default:
            return  value + ' мм';
        }
      }
    };





  constructor(private itemService:ItemService, activatedRoute:ActivatedRoute) {

    const array_filters: filters = {
      ...defaults_filters
    };

    console.log(this.all_filters)
    this.check_const();
    let itemsCollection:Observable<Item[]>;
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm){
      itemsCollection=this.itemService.getAllItemsBySearchTerm(params.searchTerm);
      }

      else if(params.tag){
      this.mytag=params.tag;
      itemsCollection=this.itemService.getAllItemsByTag(params.tag);
      }

      else {
      this.mytag="Все";
      itemsCollection=itemService.getAll();
      }

      itemsCollection.subscribe((serverItems) =>{
        this.items = serverItems;
        this.filter_items = this.items;
        this.check_const();
        this.filter_items=this.filters_start2(this.filter_items );
        //this.filter_items = this.items.filter(obj => (obj.price >=this.minValue && obj.price <= this.maxValue!));
      })


    })

    itemsCollection=itemService.getAll()



  }

  ngOnInit(): void {

  }

  func(){
    this.field = document.querySelector('input[name="item"]:checked');
    this.selectedField=this.field.id;
    console.log(this.selectedField)
  }

  func1(){
    this.field = document.querySelector('input[name="item"]:checked');
    this.selectedField=this.field.id;
    console.log(this.selectedField)
  }

  getEvent(e: ChangeContext) {
    this.filter_items = this.items.filter(obj => (obj.price >=e.value && obj.price <= e.highValue!));
  }

  //Длина клинка
  getEvent_dk(e: ChangeContext) {
    this.const_dk=true;
    //const regex = /([0-9])/g;
    //this.filter_items=this.items.filter(a=> a.origins.find(x=> (x[0]=='Длина клинка' && Number(x[1].match(regex)?.join(''))>=e.value  && Number(x[1].match(regex)?.join(''))<= e.highValue!)));
  }

  //Общая длина
  getEvent_od(e: ChangeContext) {
    this.const_od=true;
    //const regex = /([0-9])/g;
    //this.filter_items=this.items.filter(a=> a.origins.find(x=> (x[0]=='Общая длина' && Number(x[1].match(regex)?.join(''))>=e.value  && Number(x[1].match(regex)?.join(''))<= e.highValue!)));

  }

  //Ширина клинка
  getEvent_sh(e: ChangeContext) {
    this.const_sh=true;
    //const regex = /([0-9])/g;
    //this.filter_items=this.items.filter(a=> a.origins.find(x=> (x[0]=='Ширина клинка' && Number(x[1].match(regex)?.join(''))>=e.value  && Number(x[1].match(regex)?.join(''))<= e.highValue!)));
  }

    //Толщина обуха
    getEvent_to(e: ChangeContext) {
      this.const_to=true;
      //const regex = /([0-9])/g;
      //this.filter_items=this.items.filter(a=> a.origins.find(x=> (x[0]=='Ширина клинка' && Number(x[1].match(regex)?.join(''))>=e.value  && Number(x[1].match(regex)?.join(''))<= e.highValue!)));
    }


      OnChange_Chrome(selected: any): void {
        console.log(
             selected.target.name,
             selected.target.value,
             selected.target.checked
           );

      if (selected.target.checked){
      this.const_check_chrome=true;
      }
      else{this.const_check_chrome=false;}
    }

    OnChange_Anti(selected: any): void {
      console.log(
           selected.target.name,
           selected.target.value,
           selected.target.checked
         );

    if (selected.target.checked){
    this.const_check_anti=true;
    }
    else{this.const_check_anti=false;}
  }

  OnChange_Camou(selected: any): void {
    console.log(
         selected.target.name,
         selected.target.value,
         selected.target.checked
       );

  if (selected.target.checked){
  this.const_check_camou=true;
  }
  else{this.const_check_camou=false;}
}


OnChange_Rez(selected: any): void {
  console.log(
       selected.target.name,
       selected.target.value,
       selected.target.checked
     );

if (selected.target.checked){
this.const_check_rez=true;
}
else{this.const_check_rez=false;}
}

OnChange_Koz(selected: any): void {
  console.log(
       selected.target.name,
       selected.target.value,
       selected.target.checked
     );

if (selected.target.checked){
this.const_check_koz=true;
}
else{this.const_check_koz=false;}
}

OnChange_Der(selected: any): void {
  console.log(
       selected.target.name,
       selected.target.value,
       selected.target.checked
     );

if (selected.target.checked){
this.const_check_der=true;
}
else{this.const_check_der=false;}
}



  filters_del(){
    this.const_dk=false;
    this.const_od=false;
    this.const_sh=false;
    this.const_to=false;
    this.const_check_chrome=false;
    this.const_check_camou=false;
    this.const_check_anti=false;

    this.const_check_rez=false;
    this.const_check_koz=false;
    this.const_check_der=false;

    this.filter_items=this.items;

    this.min_dk=this.options_dk.floor!;
    this.max_dk=this.options_dk.ceil!;

    this.min_od=this.options_od.floor!;
    this.max_od=this.options_od.ceil!;

    this.min_sh=this.options_sh.floor!;
    this.max_sh=this.options_sh.ceil!;

    this.min_to=this.options_to.floor!;
    this.max_to=this.options_to.ceil!;


    var element = <HTMLInputElement> document.getElementById("Checkbox_Chrome");
    element.checked = false;
    var element = <HTMLInputElement> document.getElementById("Checkbox_Camou");
    element.checked = false;
    var element = <HTMLInputElement> document.getElementById("Checkbox_Anti");
    element.checked = false;

    var element = <HTMLInputElement> document.getElementById("Checkbox_Rez");
    element.checked = false;
    var element = <HTMLInputElement> document.getElementById("Checkbox_Koz");
    element.checked = false;
    var element = <HTMLInputElement> document.getElementById("Checkbox_Der");
    element.checked = false;

    this.setFiltersToLocalStorage()
    console.log(this.all_filters)
  }

filters_start(){
  const regex = /([0-9])/g;
  const regex2 = /[+-]?([0-9]*[.])?[0-9]+/g;
  let filter_items_dk:Item[];
  let filter_items_od:Item[];
  let filter_items_sh:Item[];
  let filter_items_to:Item[];
  let flag:boolean=false;

  if (this.const_dk||this.const_od||this.const_sh||this.const_to) {
    flag=true;
    filter_items_dk=this.items.filter(a=> a.origins.find(x=> (x[0]=='Длина клинка' && Number(x[1].match(regex)?.join(''))>=this.min_dk  && Number(x[1].match(regex)?.join(''))<= this.max_dk!)));
//console.log(filter_items_dk);
    filter_items_od=filter_items_dk.filter(a=> a.origins.find(x=> (x[0]=='Общая длина' && Number(x[1].match(regex)?.join(''))>=this.min_od  && Number(x[1].match(regex)?.join(''))<= this.max_od!)));
//console.log(filter_items_od);
    filter_items_sh=filter_items_od.filter(a=> a.origins.find(x=> (x[0]=='Наибольшая ширина клинка' && Number(x[1].match(regex)?.join(''))>=this.min_sh  && Number(x[1].match(regex)?.join(''))<= this.max_sh!)));
//console.log(filter_items_sh);
    filter_items_to=filter_items_sh.filter(a=> a.origins.find(x=> (x[0]=='Толщина обуха' && Number(x[1].match(regex2)?.join(''))>=this.min_to  && Number(x[1].match(regex2)?.join(''))<= this.max_to!)));
//console.log(filter_items_to);
    this.filter_items = filter_items_to;
  }

  if (this.const_check_chrome||this.const_check_camou||this.const_check_anti||
      this.const_check_rez||this.const_check_koz||this.const_check_der){
    let temp_items:Item[]=[];
    let temp_items2:Item[]=[];
    let temp_items3:Item[]=[];
    let temp_items4:Item[]=[];
    let temp_items_one:Item[]=[];
    let temp_items_two:Item[]=[];

    let unique_rezina:Item[]=[];
    let unique_koza:Item[]=[];
    let unique_der:Item[]=[];
    let unique_all:Item[]=[];


    if (flag==true) {
      this.filter_items.filter(obj =>
            obj.variants!=undefined && obj.variants.length>0 && temp_items.push(obj));
      //console.log(temp_items);
      }
      else {
        this.items.filter(obj =>
          obj.variants!=undefined && obj.variants.length>0 && temp_items.push(obj));
    //console.log(temp_items);
      }


// if (this.const_check_chrome)
//       temp_items.filter((element) =>
//             element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие") && temp_items2.push(element))
//         );
// if (this.const_check_camou)
//       temp_items.filter((element) =>
//             element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие") && temp_items2.push(element))
//         );
// if (this.const_check_anti)
//       temp_items.filter((element) =>
//             element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие") && temp_items2.push(element))
//         );

// if (this.const_check_rez)
//       temp_items.filter((element) =>
//             element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items2.push(element))
//         );
// if (this.const_check_koz)
//       temp_items.filter((element) =>
//             element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items2.push(element))
//         );
// if (this.const_check_der)
//       temp_items.filter((element) =>
//             element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items2.push(element))
//         );
    //console.log(temp_items2);



if ((this.const_check_rez||this.const_check_koz||this.const_check_der)&&(!this.const_check_chrome && !this.const_check_camou && !this.const_check_anti)){
//если выбраны варианты только из материала рукояти
if (this.const_check_rez&&(!this.const_check_chrome && !this.const_check_camou && !this.const_check_anti))
      temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items2.push(element))
        );
if (this.const_check_koz&&(!this.const_check_chrome && !this.const_check_camou && !this.const_check_anti))
      temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items2.push(element))
        );
if (this.const_check_der&&(!this.const_check_chrome && !this.const_check_camou && !this.const_check_anti))
      temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items2.push(element))
        );

        console.log("ВСЕ ДЛЯ  РУКОЯТИ ",temp_items2)
        temp_items2 = Array.from(new Set(temp_items2));
        console.log("ВСЕ ДЛЯ РУКОЯТИ БЕЗ ДУБЛИКАТОВ ",temp_items2)
        this.filter_items=temp_items2;
}
if ((this.const_check_chrome||this.const_check_camou||this.const_check_anti) &&(!this.const_check_rez && !this.const_check_koz && !this.const_check_der)){
//если выбраны варианты только из покрытия клинка
if (this.const_check_chrome &&(!this.const_check_rez && !this.const_check_koz && !this.const_check_der))
      temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие") && temp_items2.push(element))
        );
if (this.const_check_camou&&(!this.const_check_rez && !this.const_check_koz && !this.const_check_der))
      temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие") && temp_items2.push(element))
        );
if (this.const_check_anti&&(!this.const_check_rez && !this.const_check_koz && !this.const_check_der))
      temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие") && temp_items2.push(element))
        );

console.log("ВСЕ ДЛЯ ПОКРЫТИЯ ",temp_items2)
temp_items2 = Array.from(new Set(temp_items2));
console.log("ВСЕ ДЛЯ ПОКРЫТИЯ БЕЗ ДУБЛИКАТОВ ",temp_items2)
this.filter_items=temp_items2;
}



if ((this.const_check_chrome||this.const_check_camou||this.const_check_anti) &&(this.const_check_rez || this.const_check_koz || this.const_check_der)){
  //резина
  if (this.const_check_rez){
    //антиблик+резина
    if (this.const_check_anti&&this.const_check_rez){
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items2 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("антиблик и резина: ",temp_items2);
          temp_items_one=[];
          temp_items_two=[];
    }

    //хром+резина
    if (this.const_check_chrome&&this.const_check_rez){
          temp_items.filter((element) =>
          element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
          temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items3 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("хром и резина: ",temp_items3);
          temp_items_one=[];
          temp_items_two=[];
    }

    //камуфляж+резина
    if (this.const_check_camou&&this.const_check_rez) {
          temp_items.filter((element) =>
          element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
          temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items4 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("камуфляж и резина: ",temp_items4);
          temp_items_one=[];
          temp_items_two=[];
    }

    let rezina=[];
    rezina=[...temp_items2,...temp_items3,...temp_items4];
    console.log("все с резиной с повторениями: ",rezina);
    temp_items2=[];
    temp_items3=[];
    temp_items4=[];

    unique_rezina = Array.from(new Set(rezina));
    console.log("все с резиной: ",unique_rezina);
  }

  //кожа
  if (this.const_check_koz){
    //антиблик+кожа
    if (this.const_check_anti&&this.const_check_koz){
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items2 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("антиблик и кожа: ",temp_items2);
          temp_items_one=[];
          temp_items_two=[];
    }

    //хром+кожа
    if (this.const_check_chrome&&this.const_check_koz){
          temp_items.filter((element) =>
          element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
          temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items3 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("хром и кожа: ",temp_items3);
          temp_items_one=[];
          temp_items_two=[];
    }

    //камуфляж+кожа
    if (this.const_check_camou&&this.const_check_koz) {
          temp_items.filter((element) =>
          element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
          temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items4 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("камуфляж и кожа: ",temp_items4);
          temp_items_one=[];
          temp_items_two=[];
    }

    let koza=[];
    koza=[...temp_items2,...temp_items3,...temp_items4];
    console.log("все с кожей с повторениями: ",koza);
    temp_items2=[];
    temp_items3=[];
    temp_items4=[];

    unique_koza = Array.from(new Set(koza));
    console.log("все с кожей: ",unique_koza);
  }

  //дерево
  if (this.const_check_der){
  //антиблик+дерево
  if (this.const_check_anti&&this.const_check_der){
      temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие")&& temp_items_one.push(element))
        );
      temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items_two.push(element))
        );

        temp_items2 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
        console.log("антиблик и дерево: ",temp_items2);
        temp_items_one=[];
        temp_items_two=[];
  }

  //хром+дерево
  if (this.const_check_chrome&&this.const_check_der){
        temp_items.filter((element) =>
        element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие")&& temp_items_one.push(element))
        );
        temp_items.filter((element) =>
          element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items_two.push(element))
        );

        temp_items3 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
        console.log("хром и дерево: ",temp_items3);
        temp_items_one=[];
        temp_items_two=[];
  }

  //камуфляж+кожа
  if (this.const_check_camou&&this.const_check_der) {
        temp_items.filter((element) =>
        element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие")&& temp_items_one.push(element))
        );
        temp_items.filter((element) =>
          element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items_two.push(element))
        );

        temp_items4 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
        console.log("камуфляж и дерево: ",temp_items4);
        temp_items_one=[];
        temp_items_two=[];
  }

  let derevo=[];
  derevo=[...temp_items2,...temp_items3,...temp_items4];
  console.log("все с деревом с повторениями: ",derevo);
  temp_items2=[];
  temp_items3=[];
  temp_items4=[];

  unique_der = Array.from(new Set(derevo));
  console.log("все с деервом: ",unique_der);
  }

  //объединение всех рукоятей
  unique_all=[...unique_rezina,...unique_koza,...unique_der]
  this.filter_items=Array.from(new Set(unique_all));
  console.log("все: ",this.filter_items);
  }
}


  this.setFiltersToLocalStorage()
  console.log(this.all_filters)
 }

check_const(){
  if (this.min_od!=this.options_od.floor||this.max_od!=this.options_od.ceil)
  this.const_od=true;
  if (this.min_dk!==this.options_dk.floor||this.max_dk!=this.options_dk.ceil)
  this.const_dk=true;
  if (this.min_sh!=this.options_sh.floor||this.max_sh!=this.options_sh.ceil)
  this.const_sh=true;
  if (this.min_to!=this.options_to.floor||this.max_to!=this.options_to.ceil)
  this.const_to=true;
 }

filters_start2(items:Item[]){
    const regex = /([0-9])/g;
    const regex2 = /[+-]?([0-9]*[.])?[0-9]+/g;
    let filter_items_dk:Item[];
    let filter_items_od:Item[];
    let filter_items_sh:Item[];
    let filter_items_to:Item[];
    let flag:boolean=false;
/*
    if (this.min_od!=this.options_od.floor&&this.max_od!=this.options_od.ceil)
    this.const_od=true;
    if (this.min_dk!=this.options_dk.floor&&this.max_dk!=this.options_dk.ceil)
    this.const_dk=true;
    if (this.min_sh!=this.options_sh.floor&&this.max_sh!=this.options_sh.ceil)
    this.const_sh=true;
    if (this.min_to!=this.options_to.floor&&this.max_to!=this.options_to.ceil)
    this.const_to=true; */



    if (this.const_dk||this.const_od||this.const_sh||this.const_to) {
      flag=true;
      filter_items_dk=items.filter(a=> a.origins.find(x=> (x[0]=='Длина клинка' && Number(x[1].match(regex)?.join(''))>=this.min_dk  && Number(x[1].match(regex)?.join(''))<= this.max_dk!)));
  //console.log(filter_items_dk);
      filter_items_od=filter_items_dk.filter(a=> a.origins.find(x=> (x[0]=='Общая длина' && Number(x[1].match(regex)?.join(''))>=this.min_od  && Number(x[1].match(regex)?.join(''))<= this.max_od!)));
  //console.log(filter_items_od);
      filter_items_sh=filter_items_od.filter(a=> a.origins.find(x=> (x[0]=='Наибольшая ширина клинка' && Number(x[1].match(regex)?.join(''))>=this.min_sh  && Number(x[1].match(regex)?.join(''))<= this.max_sh!)));
  //console.log(filter_items_sh);
      filter_items_to=filter_items_sh.filter(a=> a.origins.find(x=> (x[0]=='Толщина обуха' && Number(x[1].match(regex2)?.join(''))>=this.min_to  && Number(x[1].match(regex2)?.join(''))<= this.max_to!)));
  //console.log(filter_items_to);
      this.filter_items = filter_items_to;
    }

    if (this.const_check_chrome||this.const_check_camou||this.const_check_anti||
        this.const_check_rez||this.const_check_koz||this.const_check_der){
      let temp_items:Item[]=[];
      let temp_items2:Item[]=[];
      let temp_items3:Item[]=[];
      let temp_items4:Item[]=[];
      let temp_items_one:Item[]=[];
      let temp_items_two:Item[]=[];

      let unique_rezina:Item[]=[];
      let unique_koza:Item[]=[];
      let unique_der:Item[]=[];
      let unique_all:Item[]=[];


      if (flag==true) {
        this.filter_items.filter(obj =>
              obj.variants!=undefined && obj.variants.length>0 && temp_items.push(obj));
        //console.log(temp_items);
        }
        else {
          items.filter(obj =>
            obj.variants!=undefined && obj.variants.length>0 && temp_items.push(obj));
      //console.log(temp_items);
        }


  // if (this.const_check_chrome)
  //       temp_items.filter((element) =>
  //             element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие") && temp_items2.push(element))
  //         );
  // if (this.const_check_camou)
  //       temp_items.filter((element) =>
  //             element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие") && temp_items2.push(element))
  //         );
  // if (this.const_check_anti)
  //       temp_items.filter((element) =>
  //             element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие") && temp_items2.push(element))
  //         );

  // if (this.const_check_rez)
  //       temp_items.filter((element) =>
  //             element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items2.push(element))
  //         );
  // if (this.const_check_koz)
  //       temp_items.filter((element) =>
  //             element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items2.push(element))
  //         );
  // if (this.const_check_der)
  //       temp_items.filter((element) =>
  //             element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items2.push(element))
  //         );
      //console.log(temp_items2);



  if ((this.const_check_rez||this.const_check_koz||this.const_check_der)&&(!this.const_check_chrome && !this.const_check_camou && !this.const_check_anti)){
  //если выбраны варианты только из материала рукояти
  if (this.const_check_rez&&(!this.const_check_chrome && !this.const_check_camou && !this.const_check_anti))
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items2.push(element))
          );
  if (this.const_check_koz&&(!this.const_check_chrome && !this.const_check_camou && !this.const_check_anti))
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items2.push(element))
          );
  if (this.const_check_der&&(!this.const_check_chrome && !this.const_check_camou && !this.const_check_anti))
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items2.push(element))
          );

          console.log("ВСЕ ДЛЯ  РУКОЯТИ ",temp_items2)
          temp_items2 = Array.from(new Set(temp_items2));
          console.log("ВСЕ ДЛЯ РУКОЯТИ БЕЗ ДУБЛИКАТОВ ",temp_items2)
          this.filter_items=temp_items2;
  }
  if ((this.const_check_chrome||this.const_check_camou||this.const_check_anti) &&(!this.const_check_rez && !this.const_check_koz && !this.const_check_der)){
  //если выбраны варианты только из покрытия клинка
  if (this.const_check_chrome &&(!this.const_check_rez && !this.const_check_koz && !this.const_check_der))
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие") && temp_items2.push(element))
          );
  if (this.const_check_camou&&(!this.const_check_rez && !this.const_check_koz && !this.const_check_der))
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие") && temp_items2.push(element))
          );
  if (this.const_check_anti&&(!this.const_check_rez && !this.const_check_koz && !this.const_check_der))
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие") && temp_items2.push(element))
          );

  console.log("ВСЕ ДЛЯ ПОКРЫТИЯ ",temp_items2)
  temp_items2 = Array.from(new Set(temp_items2));
  console.log("ВСЕ ДЛЯ ПОКРЫТИЯ БЕЗ ДУБЛИКАТОВ ",temp_items2)
  this.filter_items=temp_items2;
  }



  if ((this.const_check_chrome||this.const_check_camou||this.const_check_anti) &&(this.const_check_rez || this.const_check_koz || this.const_check_der)){
    //резина
    if (this.const_check_rez){
      //антиблик+резина
      if (this.const_check_anti&&this.const_check_rez){
          temp_items.filter((element) =>
                element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие")&& temp_items_one.push(element))
            );
          temp_items.filter((element) =>
                element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items_two.push(element))
            );

            temp_items2 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
            console.log("антиблик и резина: ",temp_items2);
            temp_items_one=[];
            temp_items_two=[];
      }

      //хром+резина
      if (this.const_check_chrome&&this.const_check_rez){
            temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие")&& temp_items_one.push(element))
            );
            temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items_two.push(element))
            );

            temp_items3 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
            console.log("хром и резина: ",temp_items3);
            temp_items_one=[];
            temp_items_two=[];
      }

      //камуфляж+резина
      if (this.const_check_camou&&this.const_check_rez) {
            temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие")&& temp_items_one.push(element))
            );
            temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Резина")&& value.type.match("Рукоять") && temp_items_two.push(element))
            );

            temp_items4 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
            console.log("камуфляж и резина: ",temp_items4);
            temp_items_one=[];
            temp_items_two=[];
      }

      let rezina=[];
      rezina=[...temp_items2,...temp_items3,...temp_items4];
      console.log("все с резиной с повторениями: ",rezina);
      temp_items2=[];
      temp_items3=[];
      temp_items4=[];

      unique_rezina = Array.from(new Set(rezina));
      console.log("все с резиной: ",unique_rezina);
    }

    //кожа
    if (this.const_check_koz){
      //антиблик+кожа
      if (this.const_check_anti&&this.const_check_koz){
          temp_items.filter((element) =>
                element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие")&& temp_items_one.push(element))
            );
          temp_items.filter((element) =>
                element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items_two.push(element))
            );

            temp_items2 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
            console.log("антиблик и кожа: ",temp_items2);
            temp_items_one=[];
            temp_items_two=[];
      }

      //хром+кожа
      if (this.const_check_chrome&&this.const_check_koz){
            temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие")&& temp_items_one.push(element))
            );
            temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items_two.push(element))
            );

            temp_items3 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
            console.log("хром и кожа: ",temp_items3);
            temp_items_one=[];
            temp_items_two=[];
      }

      //камуфляж+кожа
      if (this.const_check_camou&&this.const_check_koz) {
            temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие")&& temp_items_one.push(element))
            );
            temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Кожа")&& value.type.match("Рукоять") && temp_items_two.push(element))
            );

            temp_items4 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
            console.log("камуфляж и кожа: ",temp_items4);
            temp_items_one=[];
            temp_items_two=[];
      }

      let koza=[];
      koza=[...temp_items2,...temp_items3,...temp_items4];
      console.log("все с кожей с повторениями: ",koza);
      temp_items2=[];
      temp_items3=[];
      temp_items4=[];

      unique_koza = Array.from(new Set(koza));
      console.log("все с кожей: ",unique_koza);
    }

    //дерево
    if (this.const_check_der){
    //антиблик+дерево
    if (this.const_check_anti&&this.const_check_der){
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Антиблик")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
        temp_items.filter((element) =>
              element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items2 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("антиблик и дерево: ",temp_items2);
          temp_items_one=[];
          temp_items_two=[];
    }

    //хром+дерево
    if (this.const_check_chrome&&this.const_check_der){
          temp_items.filter((element) =>
          element.variants?.filter((value) => value.name.match("Хром")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
          temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items3 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("хром и дерево: ",temp_items3);
          temp_items_one=[];
          temp_items_two=[];
    }

    //камуфляж+кожа
    if (this.const_check_camou&&this.const_check_der) {
          temp_items.filter((element) =>
          element.variants?.filter((value) => value.name.match("Камуфляж")&& value.type.match("Покрытие")&& temp_items_one.push(element))
          );
          temp_items.filter((element) =>
            element.variants?.filter((value) => value.name.match("Дерево")&& value.type.match("Рукоять") && temp_items_two.push(element))
          );

          temp_items4 = temp_items_one.filter(o => temp_items_two.some(({id,name}) => o.id === id && o.name === name));
          console.log("камуфляж и дерево: ",temp_items4);
          temp_items_one=[];
          temp_items_two=[];
    }

    let derevo=[];
    derevo=[...temp_items2,...temp_items3,...temp_items4];
    console.log("все с деревом с повторениями: ",derevo);
    temp_items2=[];
    temp_items3=[];
    temp_items4=[];

    unique_der = Array.from(new Set(derevo));
    console.log("все с деервом: ",unique_der);
    }

    //объединение всех рукоятей
    unique_all=[...unique_rezina,...unique_koza,...unique_der]
    this.filter_items=Array.from(new Set(unique_all));
    console.log("все: ",this.filter_items);
    }
  }
  return this.filter_items;


}






/* private  setFiltersToLocalStorage():void{
  this.all_filters.dlina_ob=[this.min_od,this.max_od];
  this.all_filters.dlina_kl=[this.min_dk,this.max_dk];
  this.all_filters.shirina_kl=[this.min_sh,this.max_sh];
  this.all_filters.tolchina=[this.min_to,this.max_to];


  let res=false;
  var element = <HTMLInputElement> document.getElementById("Checkbox_Anti");
    if (element.checked == true) res=true
    else res=false
  this.all_filters.anti=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Camou");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.camou=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Chrome");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.chrome=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Koz");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.koza=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Rez");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.rezina=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Der");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.derevo=res;


  const filtersJson=JSON.stringify(this.all_filters);
  localStorage.setItem('Filters', filtersJson)
  this.filterSubject.next(this.all_filters);
}

private  getFiltersFromLocalStorage():filters{
  const filtersJson=localStorage.getItem('Filters');
  return filtersJson? JSON.parse(filtersJson):defaults_filters;

} */

private  setFiltersToLocalStorage():void{

  this.all_filters.dlina_ob=[this.min_od,this.max_od];
  this.all_filters.dlina_kl=[this.min_dk,this.max_dk];
  this.all_filters.shirina_kl=[this.min_sh,this.max_sh];
  this.all_filters.tolchina=[this.min_to,this.max_to];




  let res=false;
  var element = <HTMLInputElement> document.getElementById("Checkbox_Anti");
    if (element.checked == true) res=true
    else res=false
    this.all_filters.anti=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Camou");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.camou=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Chrome");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.chrome=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Koz");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.koza=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Rez");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.rezina=res;

  var element = <HTMLInputElement> document.getElementById("Checkbox_Der");
  if (element.checked == true) res=true
  else res=false
  this.all_filters.derevo=res;

  this.itemService.setFiltersToLocalStorage(this.all_filters);
}

}


