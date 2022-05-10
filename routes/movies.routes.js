const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');
const router = require('express').Router();
// all your routes

router.get('/', async(req,res,next) => {
    try {
        const movies = await Movie.find().populate('cast');
        console.log(movies);
        res.render('movies/movies',{movies});
    } catch (error) {
        next(error);
    }

})

router.get('/create', async (req,res,next) => {
    try {
        const celebrities = await Celebrity.find()
        res.render('movies/new-movie', {celebrities});
    } catch (error) {
        next(error);
    }    
})

router.post('/create', async(req,res,next) => {
    try {
        const {title,genre,plot,cast} = req.body;
        
        await Movie.create({
            title,
            genre,
            plot,
            cast
        })
        res.redirect('/');
    } catch(error) {
        next(error);
    }
});

router.get('/:id/edit', async (req,res, next) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        const celebrities = await Celebrity.find();

        res.render('movies/edit-movie', {movie : movie, celebrities: celebrities});
    } catch (error) {
        next(error);
    }
});

router.post('/:id/edit', async (req,res,next) => {
    console.log('movies list');
    try {
        console.log('Movie-3');
        const {id} = req.params;
        const{title,genre,plot,cast} = req.body;

        console.log('Movie-3');
        await Movie.findByIdAndUpdate(id,{title,genre,plot,cast}, {new:true});
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

router.post('/:id/delete', async(req,res,next) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndRemove(id);
        console.log('movie2:'+movie);
        res.redirect('/');
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async(req,res,next) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id).populate('cast');
        console.log('movie1:'+movie);
        res.render('movies/movie-details', movie);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
