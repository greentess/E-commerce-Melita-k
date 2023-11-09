import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { categoriess } from 'src/data';
interface category {
  name:string
  imageUrl:string;
}
@Component({
  selector: 'app-pred-catalog',
  templateUrl: './pred-catalog.component.html',
  styleUrls: ['./pred-catalog.component.css']
})
export class PredCatalogComponent implements OnInit {
  mytag="";
  categories: category[]=categoriess;
  constructor(private itemService:ItemService) {
    this.itemService.clearFilters(); }

  ngOnInit(): void {
  }

}
