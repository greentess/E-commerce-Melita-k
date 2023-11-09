import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.css']
})
export class AboutCompanyComponent implements OnInit {
  location: string;
  go_avia: string | undefined;
  go_knives: string | undefined;
  constructor(@Inject(DOCUMENT) private document: Document,private itemService:ItemService) {
    this.itemService.clearFilters();

    console.log((this.document.location.href.split('/'))[3]);
    this.location  =(this.document.location.href.split('/'))[3]
    if (this.location=="home"){
      this.go_avia="/home/company-avia";
      this.go_knives="/home/company-knives";
    }
    if (this.location=="start"){
      this.go_avia="/start/company-avia";
      this.go_knives="/start/company-knives";
    }
}

  ngOnInit(): void {
  }

}
