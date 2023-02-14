// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require(`../models/Movie.model`);
// all your routes here

router.get("/movies", async (req, res, next) => {
    try{
        let movies = await Movies.find();
        res. render (`movies/movies`, {movies});
    } catch (error){
        next(error)
    }
});

router.get (`/movies/create`, (req, res) => res.render(`movies/new-movies`));

router.post (`/movies/create`, async (req,res,next) => {
    try{
        const {title, genre, plot, cast} = req.body
        await Celebrity.create({title, genre, plot, cast})
      
     res.redirect(`/movies`);   
    } catch (error){
        console.log (error);
        next(error);
    }
});

router.get(`/movies/:id`, async (req,res, next) =>{
    try{
        const {id} = req.params
        const movies = await Movies.findById(id)
        res.render(`movies/movie-details`, movies)
    } catch (error){
        console.log (error);
        next (error);
    }
});

router.get(`/movies/:id/edit`, async (req,res,next) =>{
    try{
        const {id} = req.params;
        const movies = await Movies.findById (id);
        res.render (`movies/edit-movie`, movies);

    } catch (error){
        console.log(error);
        next(error);
    }
});

router.post (`/movies/:id/delete`, async (req,res,next) =>{
    try{
        const {id} = req.params;
        
        await Movies.findByIdAndDelete (id);
        res.redirect(`/movies`);

    } catch(error){
        console.log (error); 
        next (error);
    }
});

module.exports = router;