import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-company-avia',
  templateUrl: './company-avia.component.html',
  styleUrls: ['./company-avia.component.css']
})
export class CompanyAviaComponent implements OnInit {

  constructor(private itemService:ItemService) {
    this.itemService.clearFilters(); }

  ngOnInit(): void {
  }

}
