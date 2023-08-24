import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
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

userRouter.post("/login", (req, res) => {
  console.log(req.body);
  const userInfo = req.body;
  const userData = sample_users.find(
    (user) =>
      user.email === userInfo.email && user.password === userInfo.password
  );
  if (userData) {
    res.send(generateToken(userData));
  } else {
    res.status(400).send("User Not found");
  }
});

const generateToken = (user: any) => {
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
  return user;
};

export default userRouter;
