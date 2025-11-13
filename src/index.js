import express from 'express'
import connectDb from './config/databse.js';
import router from './routes/user.route.js';

const app=express();
app.use(express.json())

connectDb();

app.use("/user",router)
app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})