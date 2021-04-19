const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = express.Router();


router.get("/new", (req, res, next) => {
    Celebrity.find()
    .then((result) => {
        res.render("movies/new-movie.hbs", {celebs:result})
    }).catch((err) => {
        console.log(err);
        
    });
   
    
});
router.post("/new", (req, res, next) => {
    console.log(req.body.title);
    
    const {title,genre,plot} = req.body
    Movie.create({title: title, genre: genre, plot: plot})
    .then((result) => {
        console.log(result);
        
        Movie.findByIdAndUpdate(result._id, {$push:{cast: req.body.cast}})
        .then((result2)=>{
            console.log(result2);
            res.redirect("/movies/all")
            
        })
    }).catch((err) => {
        console.log(err);
        res.render("movies/new-movie.hbs")
    });
});

router.get(`/all`, (req, res) => {
  Movie.find({})
    .populate(`Celebrity`)
    .then((result) => {
      res.render("movies/movies.hbs", { movies: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get(`/:_id`,(req,res)=>{
Movie.findById(req.params)
.populate(`cast`)
.then((result) => {
    res.render("movies/movie-details", {movie: result})
}).catch((err) => {
    console.log(err);
    
});
})

router.post(`/:_id/delete`, (req,res)=>{
    Movie.findByIdAndDelete(req.params._id)
    .then((result) => {
        console.log(result)
        res.redirect(`/movies/all`)
    }).catch((err) => {
        console.log(err);  
    }); 
})

router.get(`/:_id/edit`, (req,res)=>{
    Celebrity.find()
    .then((result) => {
        res.render(`movies/edit-movie`, {celebs:result})
    }).catch((err) => {
        console.log(err);
        
    });
})

router.post(`/:_id/edit`, (req,res)=>{
    const {title,genre,plot} = req.body
    Movie.findByIdAndUpdate(req.params._id, {title: title, genre: genre, plot: plot})
    .then((result) => {
        Movie.findByIdAndUpdate(result._id, {$push:{cast: req.body.cast}})
        .then((result2)=>{
            console.log(result2);
            res.redirect("/movies/all")
        })
    }).catch((err) => {
        console.log(err);  
    }); 
})

router.post
module.exports = router;