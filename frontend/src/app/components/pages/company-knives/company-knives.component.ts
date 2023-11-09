import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-company-knives',
  templateUrl: './company-knives.component.html',
  styleUrls: ['./company-knives.component.css']
})
export class CompanyKnivesComponent implements OnInit {

  constructor(private itemService:ItemService) {
    this.itemService.clearFilters(); }

  ngOnInit(): void {
  }

}
