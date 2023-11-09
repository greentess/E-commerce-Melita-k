import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-main-start-page',
  templateUrl: './main-start-page.component.html',
  styleUrls: ['./main-start-page.component.css']
})
export class MainStartPageComponent implements OnInit {

  constructor(private itemService:ItemService) {
    this.itemService.clearFilters(); }

  ngOnInit(): void {
  }


}
