import mongoose from 'mongoose';
const orderSchema=new mongoose.Schema({
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true,
},

items:[{
product:{
type:mongoose.Schema.Types.ObjectId,
ref:"product",
},
quantity:{
    type:Number,
}}],

totalAmount:{
    type:Number,
    required:true,
},
status:{
    type:String,
    enum:["pending", "processing","delivered"],
    default:"pending"
},
date:{
    type:Date,
    default:Date.now,
}
},{timestamps:true})
const order=mongoose.model("order", orderSchema)
export default order;