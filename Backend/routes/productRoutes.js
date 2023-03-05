import  express  from "express";
import Product from "../models/ProductModel.js";
import expressAsyncHandler from 'express-async-handler'

const productRouter = express.Router();

productRouter.get('/' , async(req , res) => {
    const products = await Product.find();
    res.send(products)
})
productRouter.get(
    '/categories' , expressAsyncHandler (async(req , res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories)
    })
)
productRouter.get(
    '/Category/:category' , expressAsyncHandler (async(req , res) => {
      const product = await Product.find({category: req.params.category});
        res.send(product)
    })
)
productRouter.get('/id/:id' , async(req , res ) =>{
    const product = await Product.findOne({id: req.params.id});
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message : 'Product Not Found'})
    }
 
})
productRouter.get('/search/:id' , async(req , res ) =>{
  const result = req.params.id
  const product = await Product.findOne({name:result});
 if(product){
      res.send(product);
  }
  else{
      res.status(404).send({message : 'Product Not Found'})
  }

})
productRouter.get('/:id' , async(req , res ) =>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message : 'Product Not Found'})
    }
 
})
productRouter.post("/insert" , async(req , res) =>{
  const id = req.body.id
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const price = req.body.price
  const countInStock = req.body.countInStock
  const brand = req.body.brand
  const rating = req.body.rating
  const numReviews = req.body.numReviews
  const description = req.body.description

  const product = new Product({name : name , id : id , category : category , image : image 
    ,price : price , countInStock : countInStock , brand : brand , rating : rating
    ,numReviews : numReviews , description : description})

    try {
      await product.save();
     
      res.send("inserted data")
      
    } catch (error) {
      console.log(error)
      
    }
})
 productRouter.get('/searching' , 
  
   expressAsyncHandler (async(req , res) => {
     const results = await Product.find({name: req.query.q});
       res.json(results)
   })
)

productRouter.post(
  '/:id/reviews',
 
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }

      const review = {
        rating: Number(req.body.rating),
        name: req.body.name,
       comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
productRouter.put("/update/:id" , expressAsyncHandler (async(req , res) =>{
  const productId = req.params.id;
  const id = req.body.id
  const category = req.body.category
  const name = req.body.name
  const image = req.body.image
  const price = req.body.price
  const countInStock = req.body.countInStock
  const brand = req.body.brand
  const rating = req.body.rating
  const numReviews = req.body.numReviews
  const description = req.body.description

  const product = await Product.findById(productId);
  if (product) {
    product.name = name;
    product.slug = id;
    product.price = price;
    product.image = image;
    product.category = category;
    product.brand =brand;
    product.countInStock = countInStock;
    product.description = description;
    product.rating = rating;
    product.numReviews = numReviews;
    await product.save();
    res.send({ message: 'Product Updated' });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }

   
}))
productRouter.delete("/delete/:id" , async(req ,res) =>{
       const id = req.params.id;
       await Product.findByIdAndRemove(id).exec();
       res.send("deleted")
})
productRouter.get(
  '/admin',
 expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);
const PAGE_SIZE = 3;
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

export default productRouter