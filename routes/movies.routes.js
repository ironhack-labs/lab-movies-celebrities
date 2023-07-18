// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req,res)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("../views/movies/new-movie", {allCelebrities})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast} = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((oneMovie) => {
      return Celebrity.findByIdAndUpdate(cast, {
        $push: { movies: oneMovie._id }
      });
    })
    .then((updatedCast) => {
      res.redirect(`/movies`);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/movies/new-movie.hbs");
    });
});

router.get("/movies", (req, res) => {
  Movie.find()
  .then((allMovies) => {
    res.render("../views/movies/movies.hbs", { allMovies });
    console.log(allMovies)
  });
});

router.post("/movies/:id/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/movies/:id/edit", async (req, res) => {
  try{
  let oneMovie = await Movie.findById(req.params.id)
  let allCelebrities = await Celebrity.find()
  res.render("../views/movies/edit-movie.hbs", {oneMovie, allCelebrities});
  }
  catch(err){
    console.log(err)
  }
  })


router.post("/movies/:id/edit", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then((updatedMovie) => {
      console.log("Done")
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Failed")
      console.log(err);
    });
});

router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id).populate("cast")
    .then((oneMovie) => {
      res.render("../views/movies/movie-details.hbs", oneMovie);
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;
