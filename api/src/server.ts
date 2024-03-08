import { PrismaClient } from "@prisma/client";
import { log } from "console";

const express = require("express");

const app = express();

app.use(express.json());

const port = 3333;

const prisma = new PrismaClient();

app.get("/foods", async (req, res) => {
  const foods = await prisma.food.findMany();

  res.send(foods);
});

app.get("/food/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const food = await prisma.food.findUniqueOrThrow({
      where: { id: id },
    });

    return res.send(food);
  } catch (error) {
    console.log("Error, food not found: " + error);
  }
});

app.post("/food", async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

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

app.put("/food/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price, description, imageUrl } = req.body;

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

app.delete("/food/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.food.delete({ where: { id: id } });

    res.status(201).send("Food deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log("listening on port 3333");
});
