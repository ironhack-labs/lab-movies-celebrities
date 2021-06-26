const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')





router.get('/movies/create', (req, res) => {

    //paso importante, poner en el dropdown de cast todos las celebrities para que se pueda elegir
    //metemos a celebrities en la vista new movie, encontrando a todos .find() y luego pasando el array
    //de celebrities (convirtiendolo a objeto, a la vista movies/new.movie)
    Celebrity

        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})




router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast} = req.body

    Movie

        .create({ title, genre, plot, cast })
        .then((movies) => res.redirect('movies/movies', {film: movies}))
        .catch(err => (console.log(err), res.redirect('movies/new-movie')))
})



router.get('/movies/movies', (req, res) => {



    Movie

        .find()
        
        .then(movies => res.render('movies/movies', {  movies }))
        .catch(err => console.log(err))




})




router.get('/movies/:id', (req,res) => {

    const { id } = req.params
    

Movie

    .findById(id)
    .populate('cast') 
    
    //¡¡¡¡¡¡¡¡¡¡¡¡¡¡ATENCIÓNNNNNNNNNNNNNNN!!!!!!!!!! 
    //populamos el atributo!!!! DEL MODEL MOVIE QUE ES CAST , no usamos la referencia ('Celebrity') para populate 
    
    
    .then(movie => res.render('movies/movie-details', movie))
    .catch(err => console.log(err))



})


// all your routes here

module.exports = router;