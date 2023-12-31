import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
 async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if(usersCount> 0){
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed Is Done!");
}
))

router.post("/login", asyncHandler(
 async (req, res) => {
   const {email, password} = req.body;
   //const user = await UserModel.findOne({email , password});
   const user = await UserModel.findOne({email});
/*     if(user) {
     res.send(generateTokenReponse(user));
    }
    else{
      res.status(HTTP_BAD_REQUEST).send("Имя польователя или пароль неверны!");
    } */
    if(user && (await bcrypt.compare(password,user.password))) {
     res.send(generateTokenReponse(user));
    }
    else{
      res.status(HTTP_BAD_REQUEST).send("Имя польователя или пароль неверны!");
    }
 }
))

router.post('/register', asyncHandler(
 async (req, res) => {
   const {name, email, password,  phone} = req.body;
   const user = await UserModel.findOne({email});
   if(user){
     res.status(HTTP_BAD_REQUEST)
     .send('Пользователь уже существует, войдите в аккаунт!');
     return;
   }

   const encryptedPassword = await bcrypt.hash(password, 10);

   const newUser:User = {
     id:'',
     name,
     email: email.toLowerCase(),
     password: encryptedPassword,
     phone,
     isAdmin: false
   }

   const dbUser = await UserModel.create(newUser);
   res.send(generateTokenReponse(dbUser));
 }
))




const generateTokenReponse = (user : User) => {
 const token = jwt.sign({
  id: user.id, email:user.email, isAdmin: user.isAdmin
 },"SomeRandomText",{
   expiresIn:"30d"
 });

 return {
   id: user.id,
   email: user.email,
   name: user.name,
   phone: user.phone,
   isAdmin: user.isAdmin,
   token: token
 };
}

export default router;


