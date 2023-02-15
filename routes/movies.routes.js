const express = require('express');
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get('/movies/create', async(req, res, next) => {
try {
   const celebrities = await Celebrity.find(); 
   res.render('movies/new-movie', {celebrities});
} catch (error) {
    console.log(error);
    next(error);
}

});

router.post('/movies/create', async (req, res, next) => {
    try {
        const {title, genre, plot, cast} = req.body;
        await Movie.create({title, genre, plot, cast});
        res.redirect("/movies");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get("/movies", async (req, res, next) => {
    try {
        let movies = await Movie.find();
        res.render('movies/movies.hbs', {movies});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/movies/:id', async (req, res, next) => {
    const {id} = req.params;
    const movie = await Movie.findById(id).populate('cast')
    res.render('movies/movie-details', movie)

});

router.post('/movies/:id/delete', async (req, res, next) => {
    try {
        const {id} = req.params;
        await Movie.findByIdAndDelete(id);
        res.redirect('/movies');
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/movies/:id/edit', async (req, res, next) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        const celebrities = await Celebrities.find();
        res.render('movies/edit-movie', {movie, celebrities});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/movies/:id/edit', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, genre, plot, cast} = req.body;
        await Movie.findByIdAndUpdate(id, {title,genre,plot,cast});
        res.redirect('/movies');
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});



module.exports = router;