import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search='';
  constructor(activatedRoute:ActivatedRoute,private router:Router) {
    activatedRoute.params.subscribe((params)=>{
      if(params.search) this.search=params.search;
    })
  }

  ngOnInit(): void {
  }

  searching(term:string):void{
    if(term) this.router.navigateByUrl('/home/search/'+term);
  }
}
