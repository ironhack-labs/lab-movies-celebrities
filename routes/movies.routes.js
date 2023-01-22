// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
// all your routes here

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celeb) => {
      res.render("movies/new-movie", { celeb });
    })
    .catch((err) => res.send(err));
});

router.post("/movies/create", (req, res) => {
  Movie.create(req.body)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => res.render("movies/new-movie"));
});

router.get("/movies", (req, res) => {
  Movie.find().then((movie) => {
    res.render("movies/movies", { movie });
  });
});

router.get("/movies/:id", (req, res) =>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then((movie)=>{
    res.render("movies/movie-details", {movie})
    })
    .catch((err) => res.send(err));
})

router.post("/movies/:id/delete", (req, res)=>{
    Movie.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.redirect("/movies")
    })
    .catch((err)=> res.send(err))
})

router.get("/movies/:id/edit", (req, res)=>{

  let celebrities;

    Celebrity.find()
        .then( (celebritiesFromDB) => {
            celebrities = celebritiesFromDB;
            return Movie.findById(req.params.id)
        })
        .then((movie) => {
            const data = {
                movie: movie,
                celebrities: celebrities
            }

            res.render("movies/edit-movie", data);
        })
        .catch(err => {
            console.log("Error getting movie details from DB...", err);
        });
})



router.post("/movies/:id/edit", (req, res) =>{
  Movie.findByIdAndUpdate(req.params.id, req.body)
  .then((movie) =>{
    res.redirect(`/movies/${movie.id}`)
  })
  .catch(err => res.send(err))
})


module.exports = router;
