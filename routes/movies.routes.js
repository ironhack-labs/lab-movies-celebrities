// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all your routes here

router.get('/create', (req,res) => {
    Celebrity.find()
    .then(allCelebs => {
        res.render('new-movie', {allCelebs});
    })
    
});

router.post('/create', (req,res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect('/movies'));
});

router.get('/', (req,res) => {
    res.render('movies');
});


module.exports = router;