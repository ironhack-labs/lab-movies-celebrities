const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require('./../models/Movie.model')

router.get('/movies/create', (req, res) => {  
    
    Celebrity
    .find()
    .then((celebrities) => {
        res.render ('movies/new-movies', { celebrities })
        })
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } =  req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => {
            console.log(err)
            res.redirect('create')
        })
})

router.get('/movies', (req, res) => {

        Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})

router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast') 
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})

module.exports = router;

///////////////////////////////////////////////////////////////////////////////////////////

// router.get('/:id/edit', (req, res) => {

//     const { id } = req.params
//     let data = {}

//     Movie
//         .findById(id)
//         .then(movieToEdit => {
//             data.movie = movieToEdit;   // aquí te guardas la peli a editar en una propiedad del objeto data
//             return Celebrity.find()
//         })
//         .then(celebrities => {
//             data.celebrities = celebrities;    // y aquí te guardas todas las celebrities en otra propiedad
//             res.render('movies/edit-movie', data)     // así a la vista le puedes pasar el objeto data con toda la info disponible
//         })
//         .catch(err => console.log(err))

// })