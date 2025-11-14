import express from 'express'
import { addCart, getUserCart, removeCart } from '../controllers/cart.controller.js';
import verifyToken from '../middleware/auth.middleware.js';

const cartRouter= express.Router();

cartRouter.post('/add',verifyToken,addCart)
cartRouter.get('/',verifyToken,getUserCart)
cartRouter.delete('/:productid',verifyToken,removeCart)

export default cartRouter