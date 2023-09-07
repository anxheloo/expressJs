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

  getAllMovies: async (req, res) => {
    try {
      //**************************************  WAY 1  ************************************************ */
      console.log(req.query);
      let queryStr = JSON.stringify(req.query);
      console.log(queryStr);

      /*
      we replace gte,gt,lte or lt with $gte,$gt,$lte,$le but only exact words. 
      So if another word contains gte or gt, we dont touch it.  Using \b helps us achieve this.
      We add the 'g' -> so we replace every instance of the same word accros the string, not only 1 or the first.
      */
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      console.log(queryStr);
      const queryOBJ = JSON.parse(queryStr);
      console.log(queryOBJ);

      // const excludedFields = ["sort", "page", "limit", "fields"];
      // const queryObj = { ...req.query };
      // excludedFields.forEach((element) => {
      //   delete queryObj[element];
      // });

      let query = Movie.find();
      //THIS IS THE QUERY WE ARE ACHIEVING ABOVE
      // const movies = await Movie.find({
      //   duration: { $gte: 90 },
      //   ratings: { $gte: 5 },
      //   price: { $lte: 100 },
      // });

      //*****************************************  WAY 2  ****************************************** */

      //THIS IS THE MONGOOSE WAY USED TO FIND MOVIES BASED ON QUERIES: http://localhost:3003/api/movies/?duration=118&ratings=7&price=58
      // const movies = await Movie.find()
      //   .where("duration")
      //   .gte(req.query.duration)
      //   .where("ratings")
      //   .gte(req.query.ratings)
      //   .where("price")
      //   .lte(+req.query.price);

      //************************************** SORTING LOGIC  ************************************************ */
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      //************************************** LIMITING FIELDS ************************************************ */
      if (req.query.fields) {
        // query.select('name duration price ratings')
        const fields = req.query.fields.split(",").join(" ");
        console.log(fields);
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }

      const movies = await query;

      res.status(200).json({
        status: "Success",
        numberOfMovies: movies.length,
        data: {
          movies,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  },

  // getAllMovies: async (req, res) => {
  //   try {
  //     let keyword = req.query.keyword;
  //     const response = await Movie.aggregate([
  //       { $match: { name: new RegExp(keyword, "i") } },
  //     ]);

  //     res.send(response);
  //   } catch (error) {
  //     res.status(500).send(error);
  //   }
  // },

  getMovie: async (req, res) => {
    try {
      // const movie = await Movie.find({_id: req.params.id}) -> Same as the code below
      const movie = await Movie.findById(req.params.id);
      res.status(200).json({
        status: "Success",
        data: {
          movie,
        },
      });
    } catch (error) {
      res.status(404).json({
        message: `Movie with id ${req.params.id} doesnt exist!`,
      });
    }
  },

  updateMovie: async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      res.status(200).json({
        status: "Success",
        data: {
          updatedMovie,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  },

  deleteMovie: async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.params.id);

      res.status(204).json({
        status: "Success!",
        message: `Movie with ID ${req.params.id} is deleted!`,
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message,
      });
    }
  },
};
