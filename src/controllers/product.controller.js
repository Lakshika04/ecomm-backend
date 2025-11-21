import product from "../models/product.js";
import imagekit from '../config/imagekit.js';

const createProduct= async(req,res)=>{
    try {
        const {title,description,category,price}=req.body;
        let imageUrls = [];
        
        if(req.files && req.files.length > 0) {
            for(const file of req.files) {
                const result = await imagekit.upload({
                    file: file.buffer,
                    fileName: `${Date.now()}_${file.originalname}`,
                    folder: '/products'
                });
                imageUrls.push(result.url);
            }
        }
        
        const products= await product.create({title,description,category,price,images:imageUrls})
        return res.status(201).json({message:"product is created successfully", product: products})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const getProduct=async(req,res)=>{
    try {
        const productss=await product.find()
        res.status(200).json({message:"product data is fetched successfully",productss})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const getSingleProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const singleProduct=await product.findById(id)
        res.status(200).json({message:"single product is fetched",singleProduct})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const updateProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const products= await product.findById(id)

        const updateProduct=await product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json({message:"product is updated successfully",updateProduct})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const deleteProduct=async(req,res)=>{
    try {
         const {id}=req.params
        const products= await product.findById(id)
        const deleteProduct=await product.findByIdAndDelete(req.params.id)
        res.status(201).json({message:"product is deleted successfully",deleteProduct})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

export{createProduct,getSingleProduct,getProduct,updateProduct,deleteProduct}