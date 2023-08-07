// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model') //need for populate

// all your routes here

// ---------- [CREATE NEW MOVIE] ---------- 

router.get("/create", (req, res) => {

    Celebrity

        .find()

        .then(

            //console.log("movies page test")
            (celebrity) => res.render('movies/new-movie', { celebrity })

        )

        .catch(err => console.log(err))
})

router.post("/create", (req, res) => {

    const { title, genre, plot, cast } = req.body;

    Movie

        .create({ title, genre, plot, cast })

        .then(() => { res.redirect('/movies') })

        .catch(err => console.log(err));

});

// ---------- [LIST MOVIES] ---------- 

router.get('/', (req, res) => {

    Movie

        .find()

        .populate('cast')

        .then((movies) => res.render('movies/movies', { movies }))

        .catch(err => console.log(err))
})

// ---------- [MOVIE DETAILS] ---------- 

router.get('/:id', (req, res) => {

    const { id } = req.params

    Movie

        .findById(id)
        .populate('cast')
        .then(movie => { res.render('movies/movie-details', movie) })
        .catch(err => console.log(err))

})

// ---------- [DELETE MOVIES] ---------- 

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Movie

        .findByIdAndDelete(id)

        .then(

            movies => res.redirect('movies', movies))


        .catch(err => console.log(err))

});




module.exports = router;