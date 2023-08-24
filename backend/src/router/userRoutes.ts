import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import { BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

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
    const user = await UserModel.findOne({ email, password });
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
    const { email, password, name, address, isAdmin } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email });
    if (user) {
      res
        .status(BAD_REQUEST)
        .send("User with this email already exist ,Please login");
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: '',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: isAdmin,
    };

    const createdUser = await UserModel.create(newUser);
    const userWithToken = generateToken(createdUser);
    console.log(userWithToken);
    res.status(201).send(userWithToken);
  })
);

const generateToken = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "randomText",
    {
      expiresIn: "30d",
    }
  );
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};

export default userRouter;
