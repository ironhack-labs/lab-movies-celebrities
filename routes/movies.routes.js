const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')
const MovieModel = require('../models/Movie.model')

router.get('/create', (req, res) => {
    CelebrityModel.find()
        .then((celebrities) => {
            console.log(celebrities)
            res.render('movies/new-movie', { celebrities })
        })
        .catch((err) => next(err));
})


router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    MovieModel.create({ title, genre, plot, cast })
        .then((newMovie) => {
            console.log(newMovie)
            res.redirect('/')
        })
        .catch((err) => next(err));

})



module.exports = router;