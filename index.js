const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
const port = 8080;

const API_KEY = "&apiKey=1dd66b091ffd463f8a2222242ddfdaa0"
const initialIngredients = "apples,+flour,+sugar"

app.use(express.json());

app.get("/recipes", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${initialIngredients}&number=2${API_KEY}`
    );
    fs.writeFileSync("./data/recipes.json", JSON.stringify(response.data))
    let recipes = JSON.parse(fs.readFileSync("./data/recipes.json"))
    res.json(recipes);
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
