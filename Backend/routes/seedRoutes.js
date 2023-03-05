import  express  from "express";
import Product from "../models/ProductModel.js";
import data from "../data.js";
import User from "../models/UserModel.js";

const seedRouter = express.Router();
seedRouter.get('/' , async(req , res) => {
    await Product.remove({});
    const createProducts = await Product.insertMany(data.products);
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createProducts ,  createdUsers })

})

export default seedRouter