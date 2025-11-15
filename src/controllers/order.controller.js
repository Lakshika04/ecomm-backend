import cart from '../models/cart.js';
import order from '../models/order.js';

const placeOrder = async(req,res)=>{
    try {
        const carts= await cart.findOne({user:req.user._id}).populate("items.product")
        if(!carts || carts.items.length===0){
            return res.status(404).json({message:"cart is empty"})
        }

        
        carts.items = carts.items.filter(item => item.product !== null);

        if(carts.items.length === 0){
            return res.status(404).json({message:"cart has no valid items"})
        }

        const totalAmount= carts.items.reduce( (sum,item)=>sum+item.product.price*item.quantity,0)
        const orders = await order.create({user:req.user._id,items:carts.items,totalAmount})
        carts.items=[]
        await carts.save()
        res.status(201).json({message:"order placed successfully",orders})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const getOrder= async(req,res)=>{
    try {
        const gettOrder = await order.find({user:req.user._id})
        res.status(200).json({message:"order data is fetched successfully",gettOrder})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

export{placeOrder,getOrder}