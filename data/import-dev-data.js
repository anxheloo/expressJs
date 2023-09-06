const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Movie = require("../Models/movieModel");

dotenv.config({ path: "../config.env" });

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("Db Connected!");
  })
  .catch((err) => {
    console.log("Some error has occured!", err);
  });

//READ MOVIEWS.JSON FILE
const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

//DELETE EXISTING MOVIE DOCUMENTS FROM COLLECTION
const deleteMovies = async () => {
  try {
    await Movie.deleteMany();
    console.log("Data successfully deleted!");
  } catch (error) {
    console.log(error.message);
  }

  process.exit();
};

//IMPORT MOVIES DATA TO MONGODB COLLECTION
const importMovies = async () => {
  try {
    await Movie.create(movies);
    console.log("Data successfully imported!");
  } catch (error) {
    console.log(error.message);
  }

  process.exit();
};

if (process.argv[2] === "--import") {
  importMovies();
}

if (process.argv[2] === "--delete") {
  deleteMovies();
}

console.log(process.argv);
// deleteMovies()
// importMovies()
