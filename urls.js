import express from 'express';
import { home,contact,about } from '../controllers/view.js';
const route= express.Router();


route.get('/contact',contact);

route.get('/about',about);

route.get('/',home);


// route.post('/genre/')

export default route;
