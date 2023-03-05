import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import { generateToken } from '../util.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isCoach : user.isCoach,
          isDoctor : user.isDoctor,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);
userRouter.post("/addCoach" , async(req , res) =>{
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const isAdmin = req.body.isAdmin
  const isCoach = req.body.isCoach
  const isDoctor = req.body.isDoctor
  

  const user = new User({name : name , email : email , password: bcrypt.hashSync(password), isAdmin: isAdmin, isCoach : isCoach
    ,isDoctor : isDoctor})

    try {
      await user.save();
     
      res.send("Coach Added")
      
    } catch (error) {
      console.log(error)
      
    }
})

export default userRouter;