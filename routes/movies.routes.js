// starter code in both routes/movies.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require("./movies.routes");


 router.get ("/movies/create", (req, res, next)=>{
   
    res.render("movies/new-movie")
 });
 
 router.post ("/movies/create", (req, res,next)=>{
    console.log(req.body)
    const newMovie = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Movies.create(newMovie)
    .then((newMovie)=>{
        res.redirect("/movies")
    })
    .catch( e =>{
        console.log("error adding new movie", e)
        res.render("movies/new-movie")
        next(e);
    })
    router.get("routes/movies.routes.js", (req,res,next)=> {
        Movies.find()
        .then((listOfCeleFromDB)=> {
            (res.render("movies/movies", {MoviesArr: listOfMovFromDB}))
        })
        .catch( e => next(e))   

        })
        (res.render("movies/movies"))

    });






// all your routes here

module.exports = router;