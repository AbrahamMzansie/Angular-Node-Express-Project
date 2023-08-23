import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";

const userRouter = Router();



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
  