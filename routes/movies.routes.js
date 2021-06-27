const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Celebrity.model");
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

    const { title, genre, plot, cast } = req.body

    Movie

        .create({ title, genre, plot, cast })

        // para redirigir, ponemos .. para volver al directorio, e indicarle después que vaya a Movies
        .then((movies) => res.redirect('../movies', { film: movies }))
        .catch(err => (console.log(err), res.redirect('movies')))
})



router.get('/movies/movies', (req, res) => {

    Movie

        .find()

        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))

})


router.get('/movies/:id', (req, res) => {

    const { id } = req.params


    Movie

        .findById(id)
        .populate('cast')

        //¡¡¡¡¡¡¡¡¡¡¡¡¡¡ATENCIÓNNNNNNNNNNNNNNN!!!!!!!!!! 
        //populamos el atributo!!!! DEL MODEL MOVIE QUE ES CAST , no usamos la referencia ('Celebrity') para populate 


        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))

})



//DELETE A MOVIE

router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movie

        .findByIdAndRemove(id)
        .then(() => res.redirect('../movies'))
        .catch(err => console.log(err))
})

//EDIT MOVIES

//FIRST, GET TO RENDER THE FORM

router.get('/movies/:id/edit', (req, res) => {


    const { id } = req.params

    Movie
        .findById(id)
        .then((movie) => movie)
        //primero llamamos a movie model para obtener la peli en particular a editar con el id
        .then((movie) => {
//después, dentro de dicha movie, llamamos a todas las celebrities para que aparezcan en el form 
//y se puedan añadir/quitar las que queramos
            Celebrity
                .find()
                .then((celebrity) => res.render('movies/edit-movie', ({ movie, celebrity })))
        }





        )
})

//IMPORTANTE QUE AQUÍ LA RUTA YA NO ES CON EDIT DESPUÉS DEL {{id}}

router.post('/movies/:id', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie

        .findByIdAndUpdate(id, { title, genre, plot, cast })
        
        .then(() => res.redirect('../movies/movies'))
        .catch(err => console.log(err))
})



// all your routes here

module.exports = router;