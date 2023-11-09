import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';
import auth from '../middlewares/auth.mid';

const router = Router();
router.use(auth);

router.post('/create',
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).send('Корзина пуста!');
        return;
    }

    const newOrder = new OrderModel({...requestOrder,user: req.user.id});
    await newOrder.save();
    res.send(newOrder);
})
)
router.get('/newOrderForCurrentUser', asyncHandler( 
 async (req:any,res ) => {
 const order= await OrderModel.findOne({user: req.user.id, status: OrderStatus.NEW}).sort( { createdAt : -1 } );
 if(order) res.send(order);
 else res.status(HTTP_BAD_REQUEST).send();
}))


router.get("/myorders", asyncHandler(
 async (req:any, res) => {
   const orders = await OrderModel.find({user: req.user.id});
   res.send(orders);
 }
))

router.get("/",asyncHandler(
 async (req, res) => {
   const orders = await OrderModel.find().sort( { createdAt : -1 } );
     res.send(orders);
 }
))


router.get("/statuses", asyncHandler(
 async (req, res) => {
   const statuses = await OrderModel.aggregate([
     {
       $unwind:'$statuses'
     },
     {
       $group:{
         _id: '$statuses',
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
     count: await OrderModel.countDocuments()
   }

   statuses.push(all);
   console.log(statuses);
   console.log(all)
   res.send(statuses);
 }
))

router.get("/status/:statusName",asyncHandler(
 async (req, res) => {
   const statuses = await OrderModel.find({statuses: req.params.statusName})
   res.send(statuses);
 }
))


/* router.post('/telegram',
asyncHandler(async (req:any, res:any) => {
 let http = require('request')
 let reqBody = req.body
 let fields = [
   '<b>Имя</b>: ' + reqBody.order.name,
   '<b>Почта</b>: ' + reqBody.order.email,
   '<b>Телефон</b>: ' + reqBody.order.phone
 ]
 let msg = ''
 fields.forEach(field => {
   msg += field + '\n'
 });
 console.log('msg:', msg); 
 const TOKEN="6288912772:AAEbWEEjGAsBYaGcXN1vWoQDOyHOs4UG59Y";
 const CHAT_ID="-1001980000285";
 const URI_API=`https://api.telegram.org/bot${TOKEN}/sendMessage`;
 
 msg = encodeURI(msg)
 http.post(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=html&text=${msg}`, function (error:any, response:any, body:any) {
   console.log('error:', error); 
   console.log('statusCode:', response && response.statusCode); 
   console.log('body:', body); 
   if(response.statusCode===200){
     res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
   }
   if(response.statusCode===400){
     res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
   }
 });
})
)
 */



export default router;