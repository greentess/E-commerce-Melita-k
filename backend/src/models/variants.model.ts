import {Schema, model} from 'mongoose';

export interface Variant{
  id:string;
  name:string;
  bonus:number;
  type:string;
}

export const VariantSchema = new Schema<Variant>(
    {
        name: {type: String, required:true},
        bonus: {type: Number, required:false},
        type: {type: String, required:true},
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

export const VariantModel = model<Variant>('variant', VariantSchema);