// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movies = require('./../models/Movies.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {

    res.render('movies/new-movie');

});
//create movie
router.post('/movies/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    console.log(req.body)
    Celebrity
        .create({ title, genre, plot,  })
        .then(() => {
            console.log(req.body)
            res.redirect(`/movies/new-movie`)
        })
        .catch(err => console.log(err))
});

// all your routes here

module.exports = router;