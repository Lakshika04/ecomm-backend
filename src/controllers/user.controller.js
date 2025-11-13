import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user';

const signup=async(req , res)=>{
try{
const {name,email,password,role}=req.body
console.log("data recieved", name , email, password,role);
const existingUser=await User.findOne({email});
if(existingUser){
    return res.status(400).json({message:"user exist"})
}
const salt=await bcrypt.genSalt(10)
const hashedPasword=await bcrypt.hash(password,salt);
const newuser=new User({name,email,password:hashedPasword,role});
await newuser.save();
res.status(201).json({message:"user created successfully"})
}catch(error){
console.log("error during signup", error)
res.status(500).json({message:"internal server error"})
}
}

const login=async(req,res)=>{
try{
const {email,password}=req.body
const user=await User.findOne({email});
if(!user){
    return res.status(200).json({message:"user not found"})
}
const isPasswordValid=await bcrypt.compare(password, user.password)
if(!isPasswordValid){
    res.status(400).json({message:"invalid password"})
}

const token=jwt.sign({id:user._id,email:user.email, role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"1hr"})

res.status(200).json({message:"login successfully",user,token})
}catch(error){
console.log("error in login ", error.message)
res.status(500).json({message:"internal server error"})
}
}

export {signup , login}