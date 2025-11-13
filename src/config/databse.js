import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectDb=async()=>{
try{
const mongoUrl=process.env.MONGODB_URL;
await mongoose.connect(mongoUrl)
console.log("databse is connected successfully")
}catch(error){
    console.log("databse is failed",error)
}
}
export default connectDb;