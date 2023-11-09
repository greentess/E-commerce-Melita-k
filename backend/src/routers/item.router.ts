import {Router} from 'express';
import { sample_items, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { ItemModel } from '../models/item.model';
import { CategoryModel } from '../models/category.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { VariantModel } from '../models/variants.model';
const router = Router();

router.get("/seed", asyncHandler(
 async (req, res) => {
    const itemsCount = await ItemModel.countDocuments();
    if(itemsCount> 0){
      res.send("Загрузка данных уже была!");
      return;
    }

    await ItemModel.create(sample_items);
    res.send("Загрузка данных выполнена!");
}
))

router.get("/",asyncHandler(
 async (req, res) => {
   const items = await ItemModel.find();
     res.send(items);
 }
))

router.get("/categories",asyncHandler(
 async (req, res) => {
   const categories = await CategoryModel.find();
     res.send(categories);
 }
))
router.get("/variants",asyncHandler(
 async (req, res) => {
   const variants = await VariantModel.find();
     res.send(variants);
 }
))


router.get("/search/:searchTerm", asyncHandler(
 async (req, res) => {
   const searchRegex = new RegExp(req.params.searchTerm, 'i');
   const items = await ItemModel.find({name: {$regex:searchRegex}})
   res.send(items);
 }
))


router.get("/tags", asyncHandler(
 async (req, res) => {
   const tags = await ItemModel.aggregate([
     {
       $unwind:'$tags'
     },
     {
       $group:{
         _id: '$tags',
         count: {$sum: 1}
       }
     },
     {
       $project:{
         _id: 0,
         name:'$_id',
         count: '$count'
       }
     }
   ]).sort({count: -1});

   const all = {
     name : 'Все',
     count: await ItemModel.countDocuments()
   }

   tags.push(all);
   res.send(tags);
 }
))

router.get("/tag/:tagName",asyncHandler(
 async (req, res) => {
   const items = await ItemModel.find({tags: req.params.tagName})
   res.send(items);
 }
))

router.get("/tags/:tagMame", asyncHandler(
 async (req, res) => {
   const tags = await ItemModel.aggregate([
     {
       $unwind:'$tags'
     },
     {
       $group:{
         _id: '$tags[1]',
         count: {$sum: 1}
       }
     },
     {
       $project:{
         _id: 0,
         name:'$_id',
         count: '$count',
         maintag:'$tags[0]'
       }
     }
   ]).sort({count: -1});

   const all = {
     name : 'Все',
     count: await ItemModel.countDocuments()
   }

   tags.push(all);
   res.send(tags);
 }
))


router.get("/:itemId", asyncHandler(
 async (req, res) => {
   const item = await ItemModel.findById(req.params.itemId);
   res.send(item);
 }
))



/* DELETE */
router.delete('/:itemId', asyncHandler(
	async (req, res) => {
	const item = await ItemModel.findByIdAndRemove(req.params.itemId);
 res.send(item);
	}
));

/* SAVE */
router.post('/', asyncHandler(
	async (req, res) => {
	const item = await ItemModel.create(req.body);
 res.send(item);
	}
));

/* UPDATE BOOK */
router.put('/', asyncHandler(
	async (req, res) => {
 const itemID = req.body.id;
 const itemData = req.body;
	const item = await ItemModel.findByIdAndUpdate(itemID,itemData);
 res.send(item);
	}
));

/* router.put('/', asyncHandler(
	async (req, res) => {
 var itemData = req.body.itemData;
 if(itemData!= null){
  res.status(HTTP_BAD_REQUEST).send('пусто!');
  return;
}
 const item = await ItemModel.findById(req.body.itemData.id)
 if (item!=null){
 item.name = itemData.name;
 item.price = itemData.price;
 item.description = itemData.description;
 item.imageUrl = itemData.imageUrl;
 await item.save();
 }
 res.send(item);
	}
)); */



export default router;