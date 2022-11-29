// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
// all your routes here
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => next(error));
});

router.post("/create", (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      res.render("/movies/create");
    });
});

router.get("/:id/detail", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details",movie);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id/edit", async (req, res, next) => {
    try{
        const movie = await Movie.findById(req.params.id)
        const celebrities = await Celebrity.find()
        console.log("moview",movie)
        res.render("movies/edit-movie",{ movie,celebrities});
    }catch(error){
        next(error)
    }
});

router.post("/:id/edit", (req, res, next) => {
  //creat bject with movie's model keys and it's values should come from the form submission (which is req.body)
  const {id} = req.params
  Movie.findByIdAndUpdate(id, req.body,{new:true})
    .then((movieUpdated)=>res.redirect(`/movies/${id}/detail`))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
