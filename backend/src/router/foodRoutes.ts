import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import expressAsyncHandler from "express-async-handler";
import { FoodModel } from "../models/foodModel";

const foodRouter = Router();

foodRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const count = await FoodModel.countDocuments();
    if (count > 0) {
      res.send("Seed is already done");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send("Seed is done");
  })
);

foodRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const food = await FoodModel.find({});
    if (food) {
      res.status(200).send(food);
    } else {
      res.status(404).send("Food not found");
    }
  })
);

foodRouter.get(
  "/search/:searchTerm",
  expressAsyncHandler(async (req, res) => {
    const searchReg = new RegExp(req.params.searchTerm, "i");
    const food = await FoodModel.find({ name: { $regex: searchReg } });
    if (food) {
      res.status(200).send(food);
    } else {
      res.status(404).send("Food not found");
    }
  })
);

foodRouter.get(
  "/tags",
  expressAsyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };
    tags.unshift(all);
    if (tags) {
      res.status(200).send(tags);
    } else {
      res.status(404).send("Tags not found");
    }
  })
);

foodRouter.get(
  "/:foodId",
  expressAsyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    if (food) {
      res.status(200).send(food);
    } else {
      res.status(404).send("Food not found");
    }
  })
);

foodRouter.get(
  "/tags/:tagName",
  expressAsyncHandler(async (req, res) => {
    const food = await FoodModel.find({ tags: req.params.tagName });
    if (food) {
      res.status(200).send(food);
    } else {
      res.status(404).send("Food not found");
    }
  })
);

export default foodRouter;
