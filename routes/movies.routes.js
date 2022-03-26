// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router()
const res = require("express/lib/response")
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("movies/new-movie.hbs", { celebritiesFromDB })
    })
    .catch((err) =>
      console.log(
        `Error while getting the celebrities for creating a new movie: ${err}`
      )
    )
})

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body

  Movie.create({ title, genre, plot, cast })
    .then((newMovieFromDB) => {
      res.redirect("/movies")
    })
    .catch((err) => console.log(`Error while saving new movie: ${err}`))
})

router.get("/", (req, res) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render("movies/movies.hbs", {
        movies: moviesFromDB,
      })
    })
    .catch((err) =>
      console.log(`Error while looking for movies in the DB: ${err}`)
    )
})

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movieDetails) => {
      res.render("movies/movie-details.hbs", movieDetails)
    })
    .catch((err) =>
      console.log(`Error while getting a details of specific movie: ${err}`)
    )
})

router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err))
})

router.post("/:id/edit", (req, res) => {
  const { title, genre, plot, cast } = req.body

  Movie.findByIdAndUpdate(
    req.params.id,
    { title, genre, plot, cast },
    { new: true }
  )
    .then((updatedMovie) => res.redirect(`/movies/${req.params.id}`))
    .catch((err) => console.log(err))
})

router.get("/:id/edit", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((editMovie) => {
      Celebrity.find()
        .then((allCelebrities) => {
          allCelebrities.forEach((celeb) => {
            editMovie.cast.forEach((castMember) => {
              if (celeb._id.equals(castMember._id)) {
                celeb.isInCast = true
              }
            })
          })
          res.render("movies/edit-movie.hbs", { editMovie, allCelebrities })
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

module.exports = router
