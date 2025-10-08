import express from 'express';

import { readData,readDa,postData,updateData, deleteData, lookData, readById } from '../controllers/db_views.js';
import { verifyUser } from '../middlewares/userAuth.js';
import rout from './user_routes.js';

const router=express.Router();

router.get('/get',readData);

router.get('/get/:user',readById);

router.post('/post',postData);

router.put('/update/:movie',updateData);

router.delete('/delete/:rate',deleteData)

router.get('/registered',verifyUser,lookData)

export default router;