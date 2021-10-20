const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")



router.get("/movies/create", (req, res, next)=>{
    Celebrity
    .find()
    .populate('cast')
    .then((actorFromDB) => {
        console.log(actorFromDB);
        const data = {
            actorsArr: actorFromDB
        }
        res.render("movies/new-movie", data)
    })
    .catch( (error) => {
        console.log("Error getting list of books from DB", error);
        next(error);
    });

})


router.post("/movies/create", (req, res, next)=>{

    const {title, genre, plot, cast } = req.body;

    Movie
    .create({title, genre, plot, cast})
    .then(()=>{
        res.redirect("/movies/list")
    })
    .catch( (error) => {
        console.log("Error adding new book to DB", error);
        next(error);
    });

})

router.get('/movies/list', (req, res, next)=>{

    Movie
    .find()
    .then((listOfMoviesFromDB)=>{
        // console.log(listOfMoviesFromDB);
        res.render("movies/moviesList", {moviesArr: listOfMoviesFromDB})
    })
    .catch( (error) => {
        console.log("Error adding to DB", error);
        next(error);
    });


})

router.get('/movies/:id/', (req, res, next)=>{
    Movie
    .findById(req.params.id)
    .populate("cast")
    .then((datafromDB)=>{
        console.log('----->', datafromDB);
        res.render('movies/movie-details', datafromDB)
    })
    .catch( (error) => {
        console.log("Error adding to DB", error);
        next(error);
    });
})


router.post("/movies/:id/delete", (req, res, next)=>{
    Movie
    .findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/movies/list")
    })
    .catch( (error) => {
        console.log("Error adding to DB", error);
        next(error);
    });
})








module.exports = router