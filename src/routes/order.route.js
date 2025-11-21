import express from 'express'
import { getOrder, placeOrder, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
import verifyAdmin from '../middleware/admin.middleware.js';

const orderRouter=express.Router();

orderRouter.post("/placeorder",verifyToken,placeOrder)
orderRouter.get('/get',verifyToken,getOrder)
orderRouter.get('/all',verifyToken,verifyAdmin,getAllOrders)
orderRouter.put('/:id/status',verifyToken,verifyAdmin,updateOrderStatus)

export default orderRouter