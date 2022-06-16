const router = require("express").Router();
const Movies = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");


/* //Read celebrities in movies page
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
      .then((celebrities) => {
        console.log("found these celebrities", celebrities);
        res.render("celebrities/celebrities", {celebrities});
      })
      .catch((error) => {
        console.log("error reading celebrities", error);
        next();
      });
  }); */


//Create movies
router.get("/create", (req, res, next) => {
    console.log("celebrities",Celebrity.find())
    res.render("movies/new-movie");
  });
  
  router.post("/create", (req, res, next) => {
    
    const movies = req.body;
    Movies.create(movies)
      .then((movies) => {
        console.log("create success", movies);
        res.render("index");
      })
      .catch((err) => {
        console.log("error creating movie", err);
        next();
      });
  });



module.exports = router;

