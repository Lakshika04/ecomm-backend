import mongoose from 'mongoose';
const productSchema=new mongoose.Schema({
title:{
type:String,
required:true,
},
description:{
type:String,
required:true,
},
category:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
}
},{timestamps:true})

const product=mongoose.model("product", productSchema)
export default product