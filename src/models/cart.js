import mongoose from 'mongoose'

const cartSchema=new mongoose.Schema({
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
    default:1,
}
}]
},{timestamps:true})
const cart=mongoose.model("cart",cartSchema)
export default cart