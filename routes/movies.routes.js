const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model")
const router = require("express").Router();

router.get('/movies', (req,res,next)=>{
    Movie.find()
    .then(movies => {
        res.render('../views/movies/movies.hbs',{movies})
    })
    .catch(err=>console.log(err))
})

router.get('/movies/create', (req,res,next)=>{
    Celebrity.find()
    .then(celebrities=>{
        res.render('../views/movies/new-movie.hbs',{celebrities})
    })
})

router.post('/movies/create', (req,res,next)=>{
    const {title, genre, plot, cast} = req.body;
    Movies.create({
        title,
        genre,
        plot,
        cast
    })
    .then(()=>res.redirect('/movies'))
    .catch(err=>{
        console.log(err)
        res.redirect('/movies/create')
    })
})

module.exports = router;
