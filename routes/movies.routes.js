const router = require("express").Router();

const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get("/movies", (req, res, next)=>{
  Movie
    .find()
    .populate("celebrity")
    .then((moviesFromDB)=>{
      const data= {
        moviesArr: moviesFromDB
      }
      console.log(">>>DATA>>>")
      res.render("movies/movies", data)
    })
    .catch( (error) => {
      console.log("Error showing movies from the DB", error);
      next(error);
    });
})


router.get("/movies/create", (req, res, next)=>{
  Celebrity
    .find()
    .then((allCelebrities)=>{
      res.render("movies/new-movie", {castArr : allCelebrities})
    })

    .catch( (error) => {
      console.log("Error creating a new movie entry in the DB", error);
      next(error);
    });
})

router.post("/movies/create", (req, res, next)=>{
  const {title, genre, plot, cast} = req.body;
  Movie
    .create({title, genre, plot, cast})
    .then(()=>{
      res.redirect("/movies")
    })
    .catch( (error) => {
      console.log("Error creating new movie entry in the DB", error);
      next(error);
    });

})




module.exports = router;