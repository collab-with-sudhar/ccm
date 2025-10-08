import express from 'express';
import { createUser, loginUser, veri } from '../controllers/users.js';
import { verifyUser } from '../middlewares/userAuth.js';
import { saveSchema } from '../models/database.js';

const rout=express.Router();

rout.get('/get',async (req,res)=>{
    const result= await saveSchema.find();
    res.send(result);
})

rout.get('/get/:id',async(req,res)=>{
    const result=await saveSchema.findById({_id:req.params.id});
    res.send(result);
})

rout.post('/create',createUser);

rout.post('/login',loginUser);

rout.get('/verified',verifyUser,veri);

export default rout;