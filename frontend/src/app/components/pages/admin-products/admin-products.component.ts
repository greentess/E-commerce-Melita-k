import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Item } from 'src/app/shared/models/Item';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  itemList:Item[]=[];

	static get parameters() {
		return [ItemService, Router];
	}

  constructor(private userService:UserService,private itemService:ItemService, route:ActivatedRoute) {
    let itemsObservable:Observable<Item[]>;
    route.params.subscribe(()=>{
      itemsObservable=itemService.getAll();
      itemsObservable.subscribe((serverItems) =>{
        this.itemList = serverItems;})
    })
    itemsObservable=itemService.getAll()
  }

  ngOnInit() {
  }

  deleteItem(id: string) {
  	this.itemService.deleteItemById(id).subscribe(() => {
        for(var index = 0; index < this.itemList.length; index++) {
          if(this.itemList[index].id == id) {
            this.itemList.splice(index, 1);
          }
        }

  	});
  }
  get isAdmin(){
    return this.userService.getUserFromLocalStorage().isAdmin;
  }
}
