const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
const port = 8080;

app.use(express.json());

app.get("/recipes", async (req, res) => {
  console.log("'/test' call");
  try {
    const response = await axios.get(
      "https://api.neoscan.io/api/main_net/v1/get_all_nodes"
    );
    console.log(response);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
