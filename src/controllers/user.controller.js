import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const signup=async(req , res)=>{
try{
const {name,email,password,role}=req.body

// Validate required fields
if(!name || !email || !password){
    return res.status(400).json({message:"Name, email and password are required"})
}

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

// Validate required fields
if(!email || !password){
    return res.status(400).json({message:"Email and password are required"})
}

const user=await User.findOne({email});
if(!user){
    return res.status(404).json({message:"user not found"})
}
const isPasswordValid=await bcrypt.compare(password, user.password)
if(!isPasswordValid){
    return res.status(400).json({message:"invalid password"})
}

const token=jwt.sign({id:user._id,email:user.email, role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"1hr"})

// Remove password from user object before sending
const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
}

res.status(200).json({message:"login successfully",user:userResponse,token})
}catch(error){
console.log("error in login ", error.message)
res.status(500).json({message:"internal server error"})
}
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json({message: "Users fetched successfully", users})
    } catch (error) {
        console.log("error in getAllUsers", error.message)
        res.status(500).json({message: "internal server error"})
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        await User.findByIdAndDelete(id)
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.log("error in deleteUser", error.message)
        res.status(500).json({message: "internal server error"})
    }
}

export {signup, login, getAllUsers, deleteUser}