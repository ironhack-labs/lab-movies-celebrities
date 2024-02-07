const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model")
const Movie = require("./../models/Movie.model");

router.get("/movies/create", (req, res) => {
  Celebrity
    .find()
    .then(celebrities => res.render(("movies/new-movie"), { celebrities }))
    .catch(err => console.log(err));
});

router.post("/movies/create", (req, res) => {
  console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(movie => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/movies", (req, res) => {
  Movie
    .find()
    .populate('cast')
    .then(movies => res.render("movies/movies", { movies }))
    .catch(err => console.log(err))
})

router.get("/movies/:id", (req, res) => {
  const { id } = req.params
  Movie
    .findById(id)
    .populate('cast')
    .then(movies => res.render("movies/movie-details", movies))
    .catch(err => console.log(err))
})

router.post("/movies/:id/delete", (req, res) => {
  const { id } = req.params
  Movie
    .findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch(err => console.log(err))
})

// Tiene que haber otra forma mas limpia de hacer lo de mostrar los ya seleccionados
router.get("/movies/:id/edit", (req, res) => {
  const { id } = req.params
  Movie
    .findById(id)
    .populate("cast")
    .then(movie =>
      Celebrity
        .find()
        .then(celebrities => {
          celebrities = celebrities.map(celebrity => {
            return {
              //Selecciono ._doc para que no me salga lo que mongoose añade a los objetos, hay cosas raras ahi dentro
              ...celebrity._doc,
              selected: movie.cast.some(cast => cast._id.toString() === celebrity._id.toString())
            }
          })
          res.render('movies/edit-movie', { movie, celebrities })
        })
        .catch(err => console.log(err)))
    .catch(err => console.log(err))
})

router.post("/movies/:id/edit", (req, res) => {
  const { id } = req.params
  const { title, genre, plot, cast } = req.body;

  Movie
    .findByIdAndUpdate(id, ({ title, genre, plot, cast }))
    .then(movie => res.redirect(`/movies/${id}`))
    .catch(err => console.log(err))

})

module.exports = router;