import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible=false;
  @Input()
  notFoundMessage="Ничего не нашлось :(";
  @Input()
  resetLinkText="Назад";
  @Input()
  resetLinkRoute="/home/catalog";
  constructor() { }

  ngOnInit(): void {
  }

}
