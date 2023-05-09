const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movies.model");

const router = require("express").Router();

router.get("/create", (req, res, next) => {
  Celebrity.find()
  .then((celebrities) => {
    res.render("movies/new-movie", {
      celebrities: celebrities,
    });
  }).catch((err) => {
    next(err);
  });
});

router.post("/create", (req, res, next) => {

    Movies.create(req.body)
    .then(() => {
         res.redirect("/movies");
    })
   .catch((err) => {
        res.redirect("/movies/create");
   })
});

router.get('/', (req, res, next) => {

    Movies.find()
    .then((movies) => {
        res.render("movies/movies", {
            allMovies: movies
        })
    })
    .catch((err) => {
        next(err);
    })
})

router.get("/:id", (req, res, next) => {
    Movies.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
        res.render("movies/movie-details", {
            movie: movie
        })
    })
    .catch((err) => {
        next(err);
    })
})

router.post("/:id/delete", (req, res, next) => {

    Movies.findByIdAndRemove(req.params.id)
    .then(() => {
        res.redirect("/movies");
    })

    .catch((err) => {
        next(err);
    })
})

router.get("/:id/edit", (req, res, next) => {

    Movies.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
        Celebrity.find()
        .then((celebrities) => {
            res.render("movies/edit-movie", {
                movie: movie,
                celebrities: celebrities
            })
        })
        .catch((err) => {
            next(err);
        })
    })
    .catch((err) => {
        next(err);
    })
    
})

router.post("/:id/edit", (req, res, next) => {
    Movies.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect("/movies");
    })
    .catch((err) => {
        next(err);
    })
})

module.exports = router;