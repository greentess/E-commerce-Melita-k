import { Component, OnInit } from '@angular/core';
import { imagess } from 'src/data';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/Item';
import { photos } from 'src/data';
import { Tag } from 'src/app/shared/models/Tag';
interface photos {
  photoSrc:string;
  photoAlt:string;
  photoUrl:string;
}

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.css']
})
export class MainInfoComponent implements OnInit {
  images=imagess;
  mytag="";

  items:Item[] =[];
  items_small:Item[]=[];
  vk_photos: photos[]=photos;
  vk_photos_small: photos[]=[];
  tag_prochee:string="Прочее";
  tag_uslugi:string="Услуги";
  items_prochee:Item[] =[];
  items_uslugi:Item[] =[];
  usedItems = new Set<any>();

  constructor(private itemService:ItemService, activatedRoute:ActivatedRoute) {

    this.itemService.clearFilters();

    let itemsCollection:Observable<Item[]>;
    activatedRoute.params.subscribe((params)=>{
      this.mytag=this.tag_prochee;
      console.log(this.mytag)
      itemsCollection=this.itemService.getAllItemsByTag(this.mytag);
      itemsCollection.subscribe((serverItems) =>{
        this.items = serverItems;
        console.log(this.items)

        const usedTags = new Set();
        this.items.forEach(e => {
          usedTags.add(e.tags![1]);
        });

        usedTags.forEach(u => {
          this.usedItems.add(this.items.find(i => i.tags![1] === u ))
        });
        console.log(usedTags)
        console.log(this.usedItems)
        this.items_prochee = Array.from(this.usedItems);

      })
    })
    activatedRoute.params.subscribe((params)=>{
      this.mytag=this.tag_uslugi;
      console.log(this.mytag)
      itemsCollection=this.itemService.getAllItemsByTag(this.mytag);
      itemsCollection.subscribe((serverItems) =>{
        this.items_uslugi = serverItems;
        console.log(this.items_uslugi)
      })
    })




    let itemsObservable:Observable<Item[]>;
    let photosObservable:Observable<[]>;
    let tagsObservable:Observable<Tag[]>;


    this.vk_photos_small=this.getRandomPhotos(this.vk_photos, 10)




};



  ngOnInit(): void {

  }




  getRandomIndex = (max:number) => Math.floor(Math.random() * max);

  getRandomElements = (items:Item[], count:number) => {
    const isCountMoreThanArrayLength = count > items.length;
    const isCountLessThanOne = count < 1;
    const isCountInteger = Math.round(count) === count;

    if (isCountMoreThanArrayLength || isCountLessThanOne || !isCountInteger) return [];

    const usedIndexes = new Set();

    while (usedIndexes.size !== count) {
      usedIndexes.add(this.getRandomIndex(items.length));
    }

    return [...usedIndexes].map((index:any) => items[index]);
  }


  getRandomPhotos = (items:photos[], count:number) => {
    const isCountMoreThanArrayLength = count > items.length;
    const isCountLessThanOne = count < 1;
    const isCountInteger = Math.round(count) === count;

    if (isCountMoreThanArrayLength || isCountLessThanOne || !isCountInteger) return [];

    const usedIndexes = new Set();

    while (usedIndexes.size !== count) {
      usedIndexes.add(this.getRandomIndex(items.length));
    }

    return [...usedIndexes].map((index:any) => items[index]);
  }

  reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 0;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }


  GoTo(url: string){
    window.open(url, "_blank");
}




}

