import express from 'express'
import cors from 'cors'
import connectDb from './config/databse.js';
import router from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

const app=express();

// Enable CORS for frontend communication
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server default port
  credentials: true
}));

app.use(express.json())

//db connection
connectDb();


//route connection
app.use("/user",router)
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)


app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})