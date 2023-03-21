// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

/// Create movies

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebsArr) => {
      const data = {
        celebs: celebsArr,
      };

      res.render("movies/new-movie", data);
    })
    .catch((e) => {
      console.log("error getting celebrities ", e);
      next(e);
    });
});

router.post("/movies/create", (req, res, next) => {
  //console.log(req.body)
  Movie.create(req.body)
    .then((movieArr) => {
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log("error getting new movie ", e);
      next(e);
    });
});

////Display movies

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      const data = {
        movieArr: movies,
      };
      //console.log(data)

      res.render("movies/movies", data);
    })
    .catch((e) => {
      console.log("error getting movies from DB", e);
      next(e);
    });
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
   console.log(movie)
    res.render("movies/movie-details", movie);
  } catch (err) {
    console.log(" Error: ", err);
  }
});

router.post("/movies/:id/delete", async(req,res,next)=>{

    try{
    await  Movie.findByIdAndRemove(req.params.id)

     res.redirect("/movies")

    }
    catch(err){
        console.log("error delete",err)
    }

})

module.exports = router;
