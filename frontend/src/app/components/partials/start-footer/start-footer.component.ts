import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-footer',
  templateUrl: './start-footer.component.html',
  styleUrls: ['./start-footer.component.css']
})
export class StartFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  GoTo(url: string){
    window.open(url, "_blank");
}
}
