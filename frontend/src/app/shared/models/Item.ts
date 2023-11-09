/* export class Item{
  id!:string;
  name!:string;
  price!:number;
  description!:string;
  imageUrl!:string;
  origins!:string[];
  tags?:string[];
  vars_coverage?:string[];
  vars_handle?:string[];
  vars_color?:string[];
  vars_mod?:string[];
} */
import { Variant } from "./Variant";
export class Item{
  id!:string;
  name!:string;
  price!:number;
  description!:string;
  imageUrl!:string;
  origins!:string[][];
  tags?:string[];
  variants?:Variant[];
}
