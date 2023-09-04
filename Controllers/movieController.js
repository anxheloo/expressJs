const Movie = require("../Models/movieModel");

module.exports = {
  createMovie: async (req, res) => {
    try {
      const movie = await Movie.create(req.body);

      res.status(201).json({
        status: "Success",
        data: {
          movie,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "Fail",
        message: error,
      });
    }
  },
};
