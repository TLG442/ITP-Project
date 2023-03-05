import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const orderRouter = express.Router();

orderRouter.get(
    '/summary',
   
    expressAsyncHandler(async (req, res) => {
      
    const productCategories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({productCategories });
    })
  );