// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')


//vamos a crear aquí la ruta para la creación de movies (form, necesitamos método get- render- y post -handler-)(necesitamos "traer" a las celebrities)

router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .then(listCelebritiesDB => res.render('movies/new-movie', { listCelebritiesDB }))
        .catch(err => console.log(err));
})


router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot } = req.body;

    Movie
        .create({ title, genre, plot })
        .then(newMovie => res.redirect(`/movies/${newMovie._id}`))
        .catch(err => console.log(err))


})

//creamos la ruta para mostrar las películas creadas en Database(listing, con GET)

router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then(listMoviesDB => res.render('movies/movies.hbs', { listMoviesDB }))
        .catch(err => console.log(err))
})

//ruta para movie details, con método get, en la que utilizaremo dinamic id en la ruta, /:id, para asociar cada id a la película en cuiestión
//a la hora de navegar. Popular el objeto que hemos puesto en el modelo por ID

router.get('/movies/:id', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movieDetails => res.render('movies/movie-details', movieDetails))
        .catch(err => console.log(err));
});


// ruta para borrar las pelis

router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
});



//edición (consta también de método get (render) y post (handler))

router.get('/movies/:id/edit', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            return movie
        })
        .then(movie => {
            Celebrity
                .find()
                .then(listCelebritiesDB => {
                    // res.send({ movie, listCelebritiesDB }) (me renderiza la lista en la vista para comprobar que se "imprimen" los objetos)
                    return res.render('movies/edit-movie', { movie, listCelebritiesDB })
                })
        })
        .catch(err => console.log(err))

})


router.post('/movies/:id/edit', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params    // necesitamos el ID para el método .findByIdAndUpdate()


    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect(`/movies/${id}`)
        })
        .catch(err => console.log(err))

})


module.exports = router;