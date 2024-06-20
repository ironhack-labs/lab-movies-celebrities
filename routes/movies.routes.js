const router = require("express").Router();

const { create } = require("hbs");


const Movies = require('../models/Movie.model')
const Celebrities = require('../models/Celebrity.model')


//ITERATION #6 Ading New Movies
router.get('/movies/create', (req, res) => {

    Celebrities //tenemos que llamar a la base de datos de celebrities, pues es de done extraer la información del cast
        .find()
        .then((movie) => { res.render('movies/new-movie', { movie }) }) //aquí llamamos a each movie del new-movie donde se le pide la id del cast
        .catch(err => console.log(err))


});

router.post('/movies/create', (req, res) => { // y con el formulario POST creamos la nueva pelicula, pudiendo seleccionar el cast

    const { title, genre, plot, cast } = req.body

    Movies

        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch((err) => res.render('movies/new-movie'))

});


// ITERATION #7 Listing the movies
router.get('/movies', (req, res) => {

    Movies
        .find()
        .then((movie) => { res.render('movies/movies', { movie }) })
        .catch(err => console.log(err))
});


//ITERATION #8 The Movies Detail Page
router.get('/movies/:movies_id', (req, res) => {

    const { movies_id } = req.params
    // console.log(movies_id)

    Movies
        .findById(movies_id)
        .populate('cast')
        .then((movieCard) => res.render('movies/movie-details', movieCard))
        .catch(err => console.log(err))
});



module.exports = router;