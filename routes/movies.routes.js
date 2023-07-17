const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res) => {
    Celebrity.find()
        .then(allCelebrities => {
            res.render('movies/new-movie', { allCelebrities });
        })
        .catch(error => {
            console.log(error);
            res.redirect('/movies');
        });
});
router.post('/create', (req, res)=>{
const {title, genre, plot, cast} = req.body;
Movie.create({title, genre, plot, cast})
.then(()=>{
    res.redirect('/movies')
})
.catch((error)=>{
    console.log(error)
})
})

router.get('/', (req, res)=>{
    Movie.find()
    .then((allMovies)=>{
        res.render("movies/movies",{allMovies});
    })
    .catch((error)=>{
        console.log(error)
    })
})
module.exports = router;