const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field!"],
    unique: true,
    trim: true, //remove whitespaces before and after movie name
  },
  description: {
    type: String,
    required: [true, "Description is a required field!"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required field!"],
  },
  ratings: {
    type: Number,
    default: 1.0,
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Release year is a required field!"],
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  genres: {
    type: [String],
    required: [true, "Genres field is required!"],
  },
  directors: {
    type: [String],
    required: [true, "Directors field is required!"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required field!"],
  },
  actors: {
    type: [String],
    required: [true, "actors is required field!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required field!"],
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
