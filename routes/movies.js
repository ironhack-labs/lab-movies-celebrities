const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

//CREATE MOVIES
router.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});

router.post("/movies/create", (req, res, next) => {
  Movie.create(req.body)
    .then((movies) => {
      res.redirect("/movies", movies);
    })
    .catch((error) => {
      console.log("error en '/create'", error);
      res.redirect("movies/new-movie");
      next();
    });
});

//READ MOVIES
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", movies);
    })
    .catch((error) => {
      console.log("error en '/movies'", error);
      next();
    });
});

//DETAILS
router.get("/movies/:id", (req,res,next)=>{
    const {id} = req.params;
  Movie.findById(_id)
    .populate("cast")
    .then((movies)=>{
        res.render("movies/movies-details", movies)
    })
    .catch((error) => {
      console.log("error en '/moviesID'", error);
      next();
    });
})

//EDITING
router.get("/movies/:id/edit", (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
  CelebrityModel.find()
    .then((movies) => {
      res.render("movies/edit-movie", movies);
    })
    .catch((error) => {
      console.log("error en /edit", error);
      next();
    });
});

router.post("/movies/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { _id } = req.params;
  const { title, genre, plot } = req.body;

  Movie.findByIdAndUpdate(_id, { title, genre, plot }, { new: true })
    .then((updatedMovies) => {
      res.redirect("movies/:id", { isEdit: true, ...updatedMovies.toObject() });
    })
    .catch((error) => {
      console.log("error en /edit", error);
      next();
    });
});

//DELETE
router.post("/movies/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { _id } = req.params;
  Movie.findByIdAndRemove(_id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("error en delete", error);
      next();
    });
});



module.exports = router;
