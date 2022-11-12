const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get('/movies/create', (req,res)=>{
    Celebrity.find()
    .then((data)=>{
        let celebritiesArray = data;
        console.log(data)
        res.render("movies/new-movie", {celebritiesArray})
    })
})

router.post('/movies/create', (req, res)=>{
    let newMovie = req.body
    //console.log(newMovie)
    Movie.create(newMovie)
    .then ((newlyAddedMovie)=>{
        Movie.find({_id: newlyAddedMovie._id})
        res.redirect("/movies")
    })
})

router.get('/movies', (req,res)=>{
    Movie.find()
    .populate('cast')
    .then ((moviesArray)=>{
        res.render('movies/movies', {moviesArray})
    })
})

router.get("/movies/:id", (req,res)=>{
    console.log(req.params.id)
    Movie.findById(req.params.id)
    .populate('cast')
    .then((data)=>{
        console.log(data)
        res.render('movies/movie-details', {data})
    })
    
})

router.post('/movies/:id/delete', (req,res)=>{
    console.log(req.params)
    Movie.findByIdAndDelete(req.params.id)
    .then ((x)=>{
        res.redirect('/movies')
    })
})

router.post('/movies/:id/edit',(req,res)=>{
    const { title, genre, plot } = req.body
    Movie.findByIdAndUpdate(req.params.id, {title, genre, plot} ,  {new: true})
    .then ((data)=>{
        data.save();
        console.log(data)
        res.redirect('edit')
    })
})

router.get('/movies/:id/edit',(req,res)=>{
    let id = req.params.id
    Movie.findById(id)
    .then ((movieInfo)=>{
        res.render('movies/edit-movie', {movieInfo, id})
    })
    
})

module.exports = router;