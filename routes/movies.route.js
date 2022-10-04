const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// router.get("/books", (req, res, next) => {
//     Book.find()
//     .populate("author")
//       .then( booksFromDB => {
//           res.render("books/books-list", {books: booksFromDB})
//       })
//       .catch( err => {
//           console.log("error getting books from DB", err);
//           next();
//       })
//   });


  //CREATE: display form
router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then((celebArr) => {
        res.render("movies/new-movie", {celebArr});
    })
    .catch(err => {
        console.log("error getting celebrities from DB", err);
        next(err);
      })
})

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
  const moviesDetails = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
  }

  Movie.create(moviesDetails)
  .then( moviesDetails => {
      res.redirect("/movies")
  })
  .catch(err => {
      console.log("error creating new movie in DB", err);
      next();
  })

})
  


module.exports = router;