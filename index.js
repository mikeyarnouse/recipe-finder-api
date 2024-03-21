const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());

// const API_KEY = "&apiKey=1dd66b091ffd463f8a2222242ddfdaa0";
const API_KEY = "&apiKey=97bc6ca86f7b40f1a2efd6b703873ee1";
const initialIngredients = "apples,+flour,+sugar";

app.use(express.json());

app.post("/recipes", async (req, res) => {
  console.log(req.body);
  let ingredients = req.body.ingredients;
  let number = req.body.number;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number}${API_KEY}`
    );
    fs.writeFileSync("./data/recipes.json", JSON.stringify(response.data));
    let recipes = JSON.parse(fs.readFileSync("./data/recipes.json"));
    res.json(recipes);
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
