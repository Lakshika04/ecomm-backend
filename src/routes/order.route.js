import express from 'express'
import { getOrder, placeOrder } from '../controllers/order.controller.js';
import verifyToken from '../middleware/auth.middleware.js';



const orderRouter=express.Router();

orderRouter.post("/placeorder",verifyToken,placeOrder)
orderRouter.get('/get',verifyToken,getOrder)


export default orderRouter