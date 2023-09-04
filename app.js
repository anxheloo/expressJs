//Import express package
const express = require("express");
const fs = require("fs");
// const { type } = require("os");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const movieRouter = require("./routes/moviesRoutes");

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log(conn);
    console.log("Db Connected!");
  })
  .catch((err) => {
    console.log("Some error has occured!", err);
  });

// This is a popular middleware being used a lot
// const morgan = require("morgan");

let app = express();
let moviesList = JSON.parse(fs.readFileSync("./data/movies.json"));

// const logger = function (req, res, next) {
//   console.log("Custom middleware called");
//   req.requestedAt = new Date().toISOString();
//   next();
// };

// this will add the request body to the endpoint. It stays between request and response
app.use(express.json());

//Here we use the morgan middleware
// app.use(morgan("dev"));

//WE use this middleware to serve static files,
//we specify the fodler directory of the files and simply enter on web: http://localhost:3003/templates/demo.html
// app.use(express.static("./public"));

// we use a middleware to manimulate the req and res object. In this case we have created a custom middleware
// app.use(logger);

// Or we can use this way to return html pages
// app.get("/html", (req, res) => {
//   const htmlFile = fs.readFileSync("./public/templates/demo.html", "utf-8");
//   res.status(200).send(htmlFile);
// });

// // APIs
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Hello, world",
//     status: 200,
//   });
// });

// app.get("/api/movies", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     requestedAt: req.requestedAt,
//     count: moviesList.length,
//     data: { movies: moviesList },
//   });
// });

// app.post("/api/movies", (req, res) => {
//   const newId = moviesList[moviesList.length - 1].id + 1;
//   const newMovie = Object.assign({ id: newId }, req.body);

//   moviesList.push(newMovie);

//   fs.writeFile("./data/movies.json", JSON.stringify(moviesList), (err) => {
//     if (err) {
//       console.error("Error writing to movies.json:", err);
//       res.status(500).json({
//         status: "error",
//         message: "Failed to write data to movies.json",
//       });
//     } else {
//       res.status(201).json({
//         status: "success",
//         data: {
//           movie: newMovie,
//         },
//       });
//     }
//   });
// });

// app.get("/api/movies/:id", (req, res) => {
//   const id = req.params.id;
//   const index = Number(id) - 1;

//   if (moviesList.includes(moviesList[index])) {
//     console.log(req.params);

//     res.status(200).json({
//       status: "success",
//       data: { movies: moviesList[index] },
//     });
//   } else {
//     res.status(404).json({
//       status: `Movie with ID: ${id} doesnt Exist`,
//     });
//   }
// });

// app.patch("/api/movies/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const movie = moviesList.find((element) => element.id === id);

//   if (movie) {
//     Object.assign(movie, req.body);

//     fs.writeFile("./data/movies.json", JSON.stringify(moviesList), (err) => {
//       res.status(200).json({
//         status: "Successfully updated!",
//         movie: movie,
//       });
//     });
//   } else {
//     res.status(400).json({
//       status: "Couldnt find the movie!",
//     });
//   }
// });

// app.delete("/api/movies/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const movie = moviesList.find((element) => element.id === id);

//   if (movie) {
//     moviesList = moviesList.filter((element) => element.id !== id);

//     fs.writeFile("./data/movies.json", JSON.stringify(moviesList), (err) => {
//       res.status(200).json({
//         status: "Successfully Deleted!",
//         movie: moviesList,
//       });
//     });

//     console.log(movie);
//   } else {
//     res.status(400).json({
//       status: "Couldnt delete or find the movie!",
//     });
//   }
// });

// console.log(app.get("env"));
// console.log(process.env);

app.use("/api/movies", movieRouter);

//Create a Server
const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log("Server started!");
});
