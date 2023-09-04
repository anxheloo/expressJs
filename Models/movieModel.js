const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field!"],
    unique: true,
  },
  description: String,
  duration: {
    type: Number,
    required: [true, "Duration is required field!"],
  },
  ratings: {
    type: Number,
    default: 1.0,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

// const testMovie = new Movie({
//   name: "Die Hard",
//   description: "adfsfasdf",
//   duration: 139,
//   ratings: 4.5,
// });

// testMovie
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("Some error occured:", err);
//   });
