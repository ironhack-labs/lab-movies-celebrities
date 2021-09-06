const router = require("express").Router();

const Movie = require("./../models/Movie.model")
const Celebrity = require("./../models/Celebrity.model");


//formulario para crear a las movies
router.get("/create", (req, res)=> {
  
  Celebrity
  .find()
 // .select('id name')
  .then(celebrities => {
    //console.log("que he encontrado:" + celebrities)
    res.render('movies/new-movie', { celebrities })
  })
  .catch(err => console.log(err))

})

//mandar la informacion del formulario de creacion
router.post("/create", (req, res)=> {

  console.log("entro en el submit ")

  const { title, genre, plot, cast} = req.body

 // console.log("AQUI ESTA LA INFORMACION de la movie: " +  title, genre, plot, cast)

  Movie
    .create({ title, genre, plot, cast})
    .then(() => {
       res.redirect(`/movies`)})
    .catch(err => console.log(err))

})

//listado de movies
router.get("/", (req, res)=> {
  

  Movie
    .find()
    .populate('cast')
    .then(movies => {
      // console.log("hola buenas tardes" +  movies )
      res.render('./movies/movies', { movies })})
    .catch(err => console.log(err))
})

//Pelicula con detalles
router.get('/details/:movie_id', (req, res) => {

  const { movie_id } = req.params
  // console.log('NO ARRIESGO =====>', movie_id)

  Movie
    .findById(movie_id)
    .populate('cast')
    .then(theMovie => res.render(`movies/movie-details`, theMovie))
    .catch(err => console.log(err))

})

//Borrar pelicula/movie
// router.get('/details/:movie_id/delete', (req, res) => res.send(hola, "hola buenas"))
router.post('/details/:movie_id/delete', (req, res) => {

  const {movie_id} = req.params
  console.log("hola buenas" + movie_id)

  Movie
    .findByIdAndDelete(movie_id)
    .then(() => res.redirect(`movies/movies`))
    .catch(err => console.log('Hubo un error:', err))

})

//Editar peliculas

router.get('/details/:movie_id/edit', (req, res) => {

 

  const { movie_id } = req.params
  console.log('NO ARRIESGO =====>', movie_id)

  Movie
    .findById(movie_id)
    .populate('cast')
    .then(theMovie => theMovie)
    Celebrity.find()
 // .select('id name')
  .then(celebrities => {
    //console.log("que he encontrado:" + celebrities)
    res.render('movies/edit-movie', { celebrities })
  })
  .catch(err => console.log(err))

})





module.exports = router;