import {Schema, model} from 'mongoose';
import { Variant, VariantSchema } from './variants.model';
/* export interface Item{
  id:string;
  name:string;
  price:number;
  description:string;
  imageUrl:string;
  origins:string[][];
  tags:string[];
  vars_coverage:string[];
  vars_handle:string[];
  vars_color:string[];
  vars_mod:string[];
} */
export interface Item{
 id:string;
 name:string;
 price:number;
 description:string;
 imageUrl:string;
 origins:string[][];
 tags:string[];
 variants:Variant[];
}

/* export const ItemSchema = new Schema<Item>(
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        description: {type: String},
        imageUrl: {type: String},
        origins: {type: [Array]},
        tags: {type: [String]},
        vars_coverage: {type: [String]},
        vars_handle: {type: [String]},
        vars_color: {type: [String]},
        vars_mod: {type: [String]},
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
); */
export const ItemSchema = new Schema<Item>(
 {
     name: {type: String, required:true},
     price: {type: Number, required:true},
     description: {type: String},
     imageUrl: {type: String},
     origins: {type: [Array]},
     tags: {type: [String]},
     variants:{type: [VariantSchema], required: true},
   },{
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    },
    timestamps:true
   }
   );

export const ItemModel = model<Item>('item', ItemSchema);