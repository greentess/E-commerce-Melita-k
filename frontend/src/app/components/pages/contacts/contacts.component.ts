import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private itemService:ItemService) {   this.itemService.clearFilters();}

  ngOnInit(): void {
  }
  GoTo(url: string){
    window.open(url, "_blank");
}
}
