import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import foodRouter from "./router/foodRoutes";
import userRouter from "./router/userRoutes";
import { dbConnect } from "./configs/database";
dotenv.config();
dbConnect();


const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users" , userRouter);






app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
