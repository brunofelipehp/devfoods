const express = require("express");

const app = express();

app.use(express.json());

const foods = require("./routes/foods");

app.use("/food", foods);

const port = 3333;

app.listen(port, () => {
  console.log("listening on port 3333");
});
