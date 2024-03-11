import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const express = require("express");

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const foods = await prisma.food.findMany();

  res.send(foods);
});

router.get("/:id", async (req, res) => {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    });
    const { id } = paramsSchema.parse(req.params);

    const food = await prisma.food.findUniqueOrThrow({
      where: { id: id },
    });

    return res.send(food);
  } catch (error) {
    console.log("Error, food not found: " + error);
  }
});

router.post("/", async (req, res) => {
  const bodySchema = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    imageUrl: z.string().optional(),
  });

  const { name, price, description, imageUrl } = bodySchema.parse(req.body);

  try {
    await prisma.food.create({
      data: {
        name,
        price,
        description,
        imageUrl,
      },
    });

    console.log(req.body);
    res.send("Food created successfully");
  } catch (error) {
    console.log("Error creating food: " + error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    });
    const { id } = paramsSchema.parse(req.params);

    const bodySchema = z.object({
      name: z.string(),
      price: z.number(),
      description: z.string(),
      imageUrl: z.string().optional(),
    });

    const { name, price, description, imageUrl } = bodySchema.parse(req.body);

    const food = await prisma.food.update({
      where: { id: id },
      data: {
        name,
        price,
        description,
        imageUrl,
      },
    });

    return res.send(food);
  } catch (error) {
    console.log("Error editing food: " + error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const paramsSchema = z.object({
      id: z.string(),
    });
    const { id } = paramsSchema.parse(req.params);

    await prisma.food.delete({ where: { id: id } });

    res.status(201).send("Food deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
