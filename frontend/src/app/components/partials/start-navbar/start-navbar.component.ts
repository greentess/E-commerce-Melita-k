import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-navbar',
  templateUrl: './start-navbar.component.html',
  styleUrls: ['./start-navbar.component.css']
})
export class StartNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  GoTo(url: string){
    window.open(url, "_blank");
}
}
