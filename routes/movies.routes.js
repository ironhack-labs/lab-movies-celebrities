const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model")
const router = require("express").Router();

router.get('/movies', (req,res,next)=>{
    Movies.find()
    .then(movie => {
        res.render('../views/movies/movies.hbs',{movie})
    })
    .catch(err=>console.log(err))
})

router.get('/movies/create', (req,res,next)=>{
    Celebrity.find()
    .then(celebrities=>{
        res.render('../views/movies/new-movie.hbs',{celebrities})
    })
})

router.post('/movies/create', (req,res)=>{
    const {title, genre, plot, cast} = req.body;
    console.log(title)
    console.log(genre)
    console.log(plot)
    console.log(cast)
    Celebrity.findById(cast)
    .then(check => console.log(check))
    .catch(err => {
        console.log(err)
        res.redirect('/movies/create')
    })
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

router.get('/movies/:id', (req, res)=>{
    Movies.findById(req.params.id)
        .populate('cast')
        .then(movie=>{    
            res.render('../views/movies/movie-details.hbs', {movie})
        })
        .catch(err => console.log(err))
})

router.post('/movies/:id/delete', (req, res)=>{
    Movies.findByIdAndRemove(req.params.id)
    .then(()=> res.redirect('/movies'))
    .catch(err=> console.log(err))
})
module.exports = router;
