require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");

app.get("/movies", (req, res) => {
  const url = `http://omdbapi.com/?apikey={APIKEY}&s=${req.query}`;

  axios
    .get(url)
    .then((response) => response.json())
    .then((movies) => console.log(movies.data));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});
