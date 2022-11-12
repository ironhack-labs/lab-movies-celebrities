const router = require("express").Router();
const Movies = require('./../models/Movies.model')

router.get('/movies', (req, res, next) => {
    res.render('movies/movies');
})



module.exports = router;