import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Tag } from 'src/app/shared/models/Tag';
import { Category } from 'src/app/shared/models/Category';
@Component({
  selector: 'app-tags-on-main',
  templateUrl: './tags-on-main.component.html',
  styleUrls: ['./tags-on-main.component.css']
})
export class TagsOnMainComponent implements OnInit {
  categories?:Category[];
  constructor(categoryService:CategoryService) {
    categoryService.getAllCategories().subscribe(serverTags => {
      this.categories = serverTags;
    });
  }
  ngOnInit(): void {
  }

}
