// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const {
    createCelebrity,
    doCreateCelebrity,
    getCelebrities,
    celebrityDetails,
    deleteCelebrity,
    editCelebrity,
    updateCelebrity
} = require("../controllers/celebrities.controller")
const {
    createMovie,
    doCreateMovie,
    getMovies,
    movieDetails,
    deleteMovie,
    editMovie,
    updateMovie
} = require("../controllers/movies.controller");

// Celebrity rutes
router.get("/celebrities/create", createCelebrity);
router.get("/celebrities", getCelebrities);
router.post("/celebrities/create", doCreateCelebrity);
router.get("/celebrities/:celebrityId", celebrityDetails);
router.post("/celebrities/:celebrityId/delete", deleteCelebrity);
router.get("/celebrities/:celebrityId/edit", editCelebrity)
router.post("/celebrities/:celebrityId", updateCelebrity)

//Movie rutes
router.get("/movies/create", createMovie);
router.post("/movies/create", doCreateMovie);
router.get("/movies", getMovies);
router.post("/movies/:movieId", updateMovie)
router.get("/movies/:movieId", movieDetails);
router.post("/movies/:movieId/delete", deleteMovie);
router.get("/movies/:movieId/edit", editMovie)





module.exports = router;