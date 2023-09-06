const router = require("express").Router();
const movieController = require("../Controllers/movieController");

router.post("/", movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovie);
router.patch("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
