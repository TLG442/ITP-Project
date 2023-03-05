import express, { application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/UserRoutes.js';



dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() =>{
    console.log('connect to the mongo db database')
}).catch((err) => {
    console.log(err.message)
})
mongoose.set('strictQuery' , false)
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/seed' , seedRouter)
app.use('/api/products' , productRouter)
app.use('/api/users' , userRouter)
app.use((err,req,res,next) => {
    res.status(500).send({message: err.message})
})
app.listen(port , () => {
    console.log( `server is running on port : ${port}`);
});