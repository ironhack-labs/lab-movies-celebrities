// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movies = require("../models/Movies.model")

const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/movies/create", async(req, res, next) => {
    try {
       
        let celebrities = await Celebrity.find()
        
        res.render("movies/new-movie", {celebrities})

    } catch(error) {
        next(error)
    }
    });

    router.post("/movies/create", async(req,res,next)=> {
        try {
            const {title, genre, plot, cast} = req.body
    
            await Movies.create({title, genre, plot, cast})
            
            res.redirect("/new-movie") 
        
        } catch (error) {
            res.render("movies/new-movie");
            next(error)
    
        }
        });

        router.get("/movie-create/:moviesId", async(req, res, next) => {
            try {
                
                const {id} = req.params;
                const movies = await Movies.findById(id);
                res.render("movies/movies", movies);
                
        
            } catch(error) {
                next(error)
            }
            });

            router.post("/movie-create/:moviesId", async(req, res, next) => {
                try {

                    const {id} = req.params;
                    const {title, genre, plot, cast} = req.body;
                    await Movies.findByIdAndUpdate(id,{title, genre, plot, cast}) 
            
                    res.redirect(`/movies/${id}`)
                    
                    
            
                } catch(error) {
                    next(error)
                }
                });

module.exports = router;