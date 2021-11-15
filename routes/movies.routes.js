const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const { populate } = require("../models/Movie.model");
const Movie = require("../models/Movie.model");
// 


router.get("/create", (req, res) => {
  Celebrity.find().then((celebs) => {
    res.render("movies/new-movie", { celebs });
  });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  //5. Realizar las operaciones en la BBDD o la lógica de negocio
  Movie.create({ title, genre, plot, cast })
    //6. Decidir que vista vamos a renderizar
    .then(movie => res.redirect("/movies/movies"))
    .catch(() => res.render("movies/new-movie"));

})

router.get("/movies", (req, res) => {
  Movie.find().then((movies) => {
    res.render("movies/movies", { movies: movies });
  });
});


router.get("/movies/:id", (req, res, next) => {

  //Se puede acceder a los params mediante req.params
  // const idParam = req.params.id
  const { id } = req.params

  Movie.findById(id)
    .populate("cast")
    .then(movie => {
      res.render("movies/movie-details", movie)
    })
    .catch(err => console.log(err))

});





module.exports = router;


// router.post("/create", (req, res) => {
//   const { title, genre, plot, cast } = req.body;

//   Movie.create({ title, genre, plot, cast })
//     .then((movie) => {
//       res.redirect("/movies");
//     })
//     .catch(() => res.render("movies/new-movie"));
// });
  
//   Author.create({ title, genre, plot, cast })
//     .then(author => {
//       //Para añadir el autor al modelo de book
//       Book.findByIdAndUpdate(bookId, { $push: { author: author._id } }, { new: true })
//         .populate("author")
//         .then(book => {
//           res.render("movies", book)
//         })
//         .catch(err => console.log(err))


//     })
//     .catch(err => console.log(err))
// })



