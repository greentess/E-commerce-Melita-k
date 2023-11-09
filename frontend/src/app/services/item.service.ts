import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { sample_tags } from 'src/data';
import { Item } from '../shared/models/Item';
import { Tag} from '../shared/models/Tag';
import { ITEMS_BY_SEARCH_URL, ITEMS_BY_TAG_URL, ITEMS_TAGS_URL, ITEMS_URL, ITEM_BY_ID_URL } from '../shared/constants/urls';
import { CREATE_ITEM_URL, UPDATE_ITEM_URL, DELETE_ITEM_URL } from '../shared/constants/urls';
import { filters, defaults_filters } from 'src/app/shared/interfaces/IFilters';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public  all_filters: filters = this.getFiltersFromLocalStorage();
  private filterSubject:BehaviorSubject<filters>= new BehaviorSubject(this.all_filters);


  constructor(private http:HttpClient) { }

  getAll():Observable<Item[]>{
    // return sample_items;
    return  this.http.get<Item[]>(ITEMS_URL);
  }
  getAllItemsBySearchTerm(searchTerm:string){
    // return this.getAll().filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return this.http.get<Item[]>(ITEMS_BY_SEARCH_URL + searchTerm);
  }

  getItembyId(itemId:string):Observable<Item>{
    // return this.getAll().find(item=>item.id==itemId) ?? new Item();
    return this.http.get<Item>(ITEM_BY_ID_URL + itemId);
  }

  getAllTags():Observable<Tag[]>{
    // return sample_tags
    return this.http.get<Tag[]>(ITEMS_TAGS_URL);
  }
  getAllItemsByTag(tag:string):Observable<Item[]>{
    return tag =="Все"?
    this.getAll():
    // this.getAll().filter(item=>item.tags?.includes(tag));
    this.http.get<Item[]>(ITEMS_BY_TAG_URL + tag);
  }

  getAllTagsByMainTag(tag:string):Observable<Tag[]>{
    // this.getAll().filter(item=>item.tags?.includes(tag));
    return this.http.get<Tag[]>(ITEMS_TAGS_URL + tag);
  }



  deleteItemById(itemId:string) {
    console.log(itemId);
    return this.http.delete<Item>(ITEM_BY_ID_URL + itemId);
  }
  addItem(itemData:any) {
    return this.http.post<Item>(ITEMS_URL, itemData);
  }
  updateItem(itemData:any) {
    console.log(itemData);
    return this.http.put<Item>(ITEMS_URL,itemData);
  }





  getFiltersFromLocalStorage():filters{
    const filtersJson=localStorage.getItem('Filters');
    return filtersJson? JSON.parse(filtersJson):defaults_filters;
  }

  setFiltersToLocalStorage(array_filters:filters):void{
    const filtersJson=JSON.stringify(array_filters);
    localStorage.setItem('Filters', filtersJson)
    this.filterSubject.next(array_filters);
  }

  clearFilters(){
    let filters:filters=defaults_filters;
    this.setFiltersToLocalStorage(filters);
  }
}
