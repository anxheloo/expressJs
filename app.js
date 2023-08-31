//Import express package
const express = require("express");
const fs = require("fs");
const { type } = require("os");
let app = express();

let moviesList = JSON.parse(fs.readFileSync("./data/movies.json"));

// this will add the request body to the endpoint. It stays between request and response
app.use(express.json());

// APIs
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world", status: 200 });
});

app.get("/api/movies", (req, res) => {
  res.status(200).json({
    status: "success",
    count: moviesList.length,
    data: { movies: moviesList },
  });
});

app.post("/api/movies", (req, res) => {
  const newId = moviesList[moviesList.length - 1].id + 1;
  const newMovie = Object.assign({ id: newId }, req.body);

  moviesList.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(moviesList), (err) => {
    if (err) {
      console.error("Error writing to movies.json:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to write data to movies.json",
      });
    } else {
      res.status(201).json({
        status: "success",
        data: {
          movie: newMovie,
        },
      });
    }
  });
});

app.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const index = Number(id) - 1;

  if (moviesList.includes(moviesList[index])) {
    console.log(req.params);

    res.status(200).json({
      status: "success",
      data: { movies: moviesList[index] },
    });
  } else {
    res.status(404).json({
      status: `Movie with ID: ${id} doesnt Exist`,
    });
  }
});

app.patch("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = moviesList.find((element) => element.id === id);

  if (movie) {
    Object.assign(movie, req.body);

    fs.writeFile("./data/movies.json", JSON.stringify(moviesList), (err) => {
      res.status(200).json({
        status: "Successfully updated!",
        movie: movie,
      });
    });
  } else {
    res.status(400).json({
      status: "Couldnt find the movie!",
    });
  }
});

app.delete("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  const movie = moviesList.find((element) => element.id == id);

  if (movie) {
    moviesList = moviesList.filter((element) => element.id !== id);

    fs.writeFile("./data/movies.json", JSON.stringify(moviesList), (err) => {
      res.status(200).json({
        status: "Successfully Deleted!",
        movie: moviesList,
      });
    });

    console.log(movie);
  } else {
    res.status(400).json({
      status: "Couldnt delete or find the movie!",
    });
  }
});

//Create a Server
const port = 3003;
app.listen(port, () => {
  console.log("Server started!");
});
