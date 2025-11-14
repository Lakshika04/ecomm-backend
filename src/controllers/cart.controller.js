import cart from "../models/cart.js";

const addCart=async(req,res)=>{
    try {
        const {productid,quantity}=req.body
        let carts = await cart.findOne({user: req.user._id})
        if(!carts){
         carts = await cart.create({items:[{product:productid,quantity}],user: req.user._id})
        }
        else{
            const item= carts.items.find(i=> i.product.toString()===productid)
            if(item){
                item.quantity+=quantity
            }
            else{
                carts.items.push({product:productid,quantity})
            }
            await carts.save()
            }
           res.status(201).json({message:"cart created successfully"}) 
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const getUserCart= async(req,res)=>{
    try {
        const cartss= await cart.findOne({user:req.user._id}).populate("items.products")
        res.status(200).json({message:"cart is fetched",cartss})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const removeCart=async(req,res)=>{
    try {
        const {productid}=req.body
        const carts= await cart.findOne({user:req.user._id})
        if(!carts){
            return res.status(404).json({message:"cart not found"})
        }
        carts.items=carts.items.filter(i=>i.product.toString()!==productid)
        await carts.save()
        res.status(200).json({message:"item is removed successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

export{removeCart,getUserCart,addCart}