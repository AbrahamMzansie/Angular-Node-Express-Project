import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/userModel";
import expressAsyncHandler from "express-async-handler";

const userRouter = Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const count = await UserModel.countDocuments();
    if (count > 0) {
      res.send("Seed is already done");
      return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done");
  })
);

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email ,password });
    if (user) {     
      res.send(generateToken(user));
    } else {
      res.status(400).send("User email or Password is invalid");
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { email, password , name , address } = req.body;
    const user = await UserModel.findOne({ email ,password });
    if (user) {     
      res.send(generateToken(user));
    } else {
      res.status(400).send("User email or Password is invalid");
    }
  })
);

const generateToken = (user:any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "randomText",
    {
      expiresIn: "30d",
    }
  );
  
  user.token = token;
  console.log("WWWWWWWWWWWWWW",user);
  return user;
};

export default userRouter;
