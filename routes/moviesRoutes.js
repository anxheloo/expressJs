const router = require("express").Router();
const movieController = require("../Controllers/movieController");

router.post("/", movieController.createMovie);

module.exports = router;
