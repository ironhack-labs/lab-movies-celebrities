// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//CREATE
//Route GET to Add New Movie
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie", {allCelebrities});
    })
    .catch((err) => {
      next(err);
    });
});

//Route POST to Add New Movie
router.post('/create', (req, res, next) => {
  Movie.create({
    title: req.body.movtitle,
    genre: req.body.movgenre,
    plot: req.body.movplot,
  })
  .then((dbMovie) => {
    dbMovie.cast.push(req.body.movcelebrity);
    dbMovie.save();
    res.redirect("/movies");
  })
  .catch((err) => {
    res.redirect("/create");
  });
});


//READ
//Route to display all Movies
router.get("/", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies/movies", { movies: allMovies });
    })
    .catch((err) => {
      next(err);
    });
});


//Route to display Movie Details
router.get("/:theId", (req, res, next) => {
  Movie.findById(req.params.theId).populate("cast")
  .then((dbMovie) => {
    res.render("movies/movie-details", dbMovie);
    // res.send(dbMovie);
  }) 
  .catch((err) => {
    next(err);
  });
 
});


//UPDATE
//Route to edit a Movie
router.get("/:theId/edit", (req, res, next) => {
  Movie.findById(req.params.theId).populate("cast")
  .then((theMovie)=> {
    Celebrity.find()
    .then(allCelebrities => {
      allCelebrities.forEach(celeb => {
        theMovie.cast.forEach(castMember => {
          if(celeb._id.equals(castMember._id)){
            celeb.isinthecast = true;
          }
        }) 
        
      });
      res.render("movies/edit-movie", {theMovie, allCelebrities});
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
});

router.post("/:theId", (req, res, next) => {
  const {title, genre, plot, cast} = req.body; 
  Movie.findByIdAndUpdate(req.params.theId, {title, genre, plot, cast}, {new: true})
  .then((dbMovie) => {
    res.redirect(`/movies/${req.params.theId}`);
  })
  .catch((err) => {
    next(err);
  });
});


//DELETE
//Route to delete a Movie
router.post("/:theId/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.theId)
  .then((dbMovie) => {
    res.redirect("/movies");
  })
  .catch((err) => {
    next(err);
  })
})


module.exports = router;
