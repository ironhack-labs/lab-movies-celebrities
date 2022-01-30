// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celeb = require("../models/Celebrity.model");
// all your routes here
router.get('/movies', (req, res, next) => {
    Movie.find()
    .populate('cast')
    .then(movies => res.render('movies/movies.hbs', {movies}))
    .catch(err => console.log(`Error loading movies : ${err}`));
});

router.get('/movies/create', (req, res, next) =>{
    Celeb.find()
    .then(celebs => res.render('movies/new-movie', {celebs}))
    .catch(err => console.log(`Error loading movies : ${err}`));
});

router.post('/movies/create', (req, res, next) => {
    const {title,genre,plot,cast} = req.body;
    console.log(title,genre,plot,cast);
    Movie.create({title,genre,plot,cast})
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(`Error loading movies : ${err}`));

});

router.post('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Movie.findByIdAndDelete(id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(`Error deleting movie : ${err}`));

});

router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params;
    Movie.findById(id)
    .populate('cast')
    .then(movie => res.render('movies/movie-details',movie))
    .catch(err => console.log(`Error loading movie : ${err}`));
});

router.get('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Movie.findById(id)
    .populate('cast')
    .then(movie => {
        Celeb.find()
        .then(celebs => {
            let celeb = {};
            const selectedCelebs = celebs.map(a => {
                const {_id,name} = a; 
                celeb = {_id,name};
                celeb.selected = false;
                movie.cast.forEach(b => celeb.selected = celeb.name === b.name ? true : celeb.selected);
                return celeb;
            });
            res.render('movies/edit-movie',{movie,selectedCelebs})
        })
        .catch(err => console.log(`Error loading celebs : ${err}`));
    })
    .catch(err => console.log(`Error loading movie : ${err}`));
});

router.post('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params;
    const {title,genre,plot,cast} = req.body;
    Movie.findByIdAndUpdate(id,{title,genre,plot,cast})
    .then(movie => res.redirect(`/movies/${id}/edit`))
    .catch(err => console.log(`Error loading movie : ${err}`));
});


module.exports = router;