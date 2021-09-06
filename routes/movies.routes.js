// starter code in both routes/movies.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res) => {
  Celebrity.find().then((allCelebrities) => {
    res.render("movies/new-movie", { allCelebrities });
  });
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", movie);
    });
});

router.get("/:id/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((deletedMovie) => res.redirect("/movies"))
    .catch((error) => console.log(error));
});

router.route("/:id/edit")
.get((req, res)=>{
  Movie.findById(req.params.id)
  .populate('cast')
  .then(movie => {
    Celebrity.where('_id').nin(movie.cast).then((allCelebrities) => {
      res.render("movies/edit-movie", {movie, allCelebrities})
    })
  })

})
.post((req, res)=>{
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(
    req.params.id,
    { title, genre, plot, cast }
  )
  .then(updateMovie => res.redirect(`/movies/${req.params.id}`))
  .catch(error => console.log(error))
})

router.get("/", (req, res) => {
  Movie.find().then((allMovies) => {
    res.render("movies/movies", { allMovies });
  });
});

router.post("/", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast }).then((newMovie) =>
    res.redirect("/movies/")
  );
});

module.exports = router;
