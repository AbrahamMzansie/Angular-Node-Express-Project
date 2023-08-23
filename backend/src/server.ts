import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { sample_foods, sample_tags, sample_users } from "./data";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  res.send(foods);
});

app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sample_foods.find((food) => food.id === foodId);
  res.send(foods);
});

app.get("/api/foods/tags/:tagName", (req, res) => {
  const tagData = req.params.tagName;
  const foods: any = sample_foods.filter((food) =>
    food?.tags?.includes(tagData)
  );
  res.send(foods);
});

app.post("/api/users/login", (req, res) => {
  console.log(req.body)
  const userInfo = req.body;
  const userData = sample_users.find(
    (user) =>
      user.email === userInfo.email && user.password === userInfo.password
  );
  if (userData) {
    res.send(generateToken(userData));
  }else{
    res.status(400).send("User Not found")
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
