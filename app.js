//Import express package
const express = require("express");
const fs = require("fs");
let app = express();

let moviesList = JSON.parse(fs.readFileSync("./data/movies.json"));

//ROUTE = HTTP METHOD + URL
// APIs
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world", status: 200 });
});

app.get("/api/movies", (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      count: moviesList.length,
      data: { movies: moviesList },
    });
});

//Create a Server
const port = 3003;
app.listen(port, () => {
  console.log("Server started!");
});
