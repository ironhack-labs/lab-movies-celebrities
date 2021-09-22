const Movie = require('./../models/Movie')
const Celebrity = require('./../models/Celebrity.model')
const { move } = require('../routes')

exports.Create = async (req, res) => {
  //Encuentro todas las celebridades en el mongo
  const dbCelebrities = await Celebrity.find()
  console.log(dbCelebrities)
  //las paso como objeto para poder desplegarlas en el hbs
  res.render('movies/new-movie', {
    dbCelebrities
  })
}

exports.CreateFromForm = async (req, res) => {
  const { title, genre, plot, cast } = req.body
  //Generamos una pelicula nueva en la base de datos
  const newMovie = await Movie.create({ title, genre, plot, cast })
  console.log(newMovie)

  // await Movie.findByIdAndUpdate(cast,{$push:{cast:newMovie._id}})
  //console.log(newMovie)
  return res.redirect('/movies')
}

exports.list = async (req, res) => {
  //encuentra todas las peliculas
  const dbMovies = await Movie.find()

  return res.render('movies/movies', {
    moviesList: dbMovies
  })
}

exports.Details = async (req, res) => {
  const { id } = req.params
  //Encuentra la pelicula por id y hace el populete
  const movieDetails = await Movie.findById(id).populate('cast')

  console.log(movieDetails)
  return res.render('movies/movie-details', movieDetails)
}

exports.Delete = async (req, res) => {
  console.log(req.params)
  const { id } = req.params
  //Encuentra por id y remueve
  await Movie.findByIdAndRemove(id)
  res.redirect('/movies')
}

exports.edit = async (req, res) => {
  console.log('edit')
  const { id } = req.params
  const dbMovie = await Movie.findById(id).populate('cast')
  //console.log(dbMovie.cast[0].name)
  const name = dbMovie.cast[0].name
  const celebrities = await Celebrity.findOne({ name: name })
  const dbCelebrities = await Celebrity.find()
  console.log(celebrities)
  res.render('movies/edit-movie', {
    dbMovie: dbMovie,
    celebrities: celebrities,
    dbCelebrities
  })
}

exports.update = async (req, res) => {
  console.log(req.body)
  const { id } = req.params
  const { title, genre, plot, cast } = req.body

  const newMovie = await Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
  //console.log(newMovie)

  return res.redirect('/movies')
}
