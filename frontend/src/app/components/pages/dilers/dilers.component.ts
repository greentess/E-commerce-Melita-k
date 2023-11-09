import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { dilerss } from 'src/data';
interface dilers {
  imageSrc:string;
  name:string;
  dilerUrl:string;
  adr:string;
}

@Component({
  selector: 'app-dilers',
  templateUrl: './dilers.component.html',
  styleUrls: ['./dilers.component.css']
})
export class DilersComponent implements OnInit {
  dilers: dilers[]   = dilerss;

  selectedField:string = 'all';
  field: any;

  cities:any = new Set(this.dilers.map(diler => diler.adr))

  constructor(private itemService:ItemService) {
    this.itemService.clearFilters();

  }

  ngOnInit(): void {
  }




  GoTo(url: string){
  window.open(url, "_blank");
}

func(){
  this.field = document.querySelector('input[name="diler"]:checked');
  this.selectedField=this.field.id;
  console.log(this.selectedField)
}
}
