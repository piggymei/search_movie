require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/movies", (req, res) => {
  const url = `http://omdbapi.com/?apikey=${process.env.APIKEY}&s=${req.query.s}`;

  axios.get(url).then((movies) => console.log(movies.data));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});
