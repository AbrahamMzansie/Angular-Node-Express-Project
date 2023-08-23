import { Router } from "express";
import { sample_foods, sample_tags } from "../data";

const foodRouter = Router();

foodRouter.get("/", (req, res) => {
  res.send(sample_foods);
});

foodRouter.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  res.send(foods);
});

foodRouter.get("/tags", (req, res) => {
  res.send(sample_tags);
});

foodRouter.get("/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sample_foods.find((food) => food.id === foodId);
  res.send(foods);
});

foodRouter.get("/tags/:tagName", (req, res) => {
  const tagData = req.params.tagName;
  const foods: any = sample_foods.filter((food) =>
    food?.tags?.includes(tagData)
  );
  res.send(foods);
});

export default foodRouter;
