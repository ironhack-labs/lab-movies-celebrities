// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("./../models/movies.model");
const Celebrity = require("./../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((theCelebrities) =>
      res.render("movies/new-movie", { theCelebrities })
    )
    .catch((err) => console.log("Error!!!", err));
});
router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  console.log("esto es el req.body", req.body);

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log("Error!!!", err));
});

router.get("/", (req, res) => {
  Movie.find()
    .select("title genre plot cast")
    .then((theMovies) => res.render("movies/movies", { theMovies }));
});

router.get("/:value", (req, res) => {
  const { value } = req.params;

  Movie.findById(value)
    .select(" title cast genre plot")
    .populate("cast")
    .then((movies) => {
      //console.log( 'esto es lo que traae el objeto movies', movies)
      res.render("movies/movie-details", movies);
    })
    .catch((err) => console.log("Error detailling the movies!!!", err));
});

//starter code in both routes/celebrities.routes.js and routes/movies.routes.js

//all your routes here

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  console.log(id);

  Movie.findByIdAndDelete(id)
    .then((removedMovie) => {
      res.redirect("/movies");
      console.log("La pelicula eliminada es:", removedMovie);
    })
    .catch((err) => console.log("Hubo un error:", err));
});

router.post('/:id/edit',(req,res) => {
  let findMovies = {}
  let findCelebrities = {}
  console.log('estoy funcionando')
  

   const {id} = req.params
   console.log(id)
  Movie
  .findById(id)
  .populate("cast")
  .then((movies) => {
    findMovies = movies
    return Celebrity.find()
  })
  .then((theCelebrities) => {
    
    findCelebrities = theCelebrities
    
    res.render('movies/edit-movie',{findMovies,findCelebrities})
  
  } )
  .catch((err) => console.log("Error!!!", err));
  
  

})


router.post('/:id',(req,res) =>{
  const {id} = req.params
  const {title, genre, plot, cast} = req.body


  Movie
    .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then(theMovie => res.redirect(`/movies/movie-details/${theMovie.id}`))
    .catch(err => console.log(err))

})

module.exports = router;
