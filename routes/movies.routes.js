const async = require("hbs/lib/async");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get("/movies/create", async (req, res)=> {
    try {
        const dbCelebrities = await Celebrity.find({}, {name: 1});
    // res.send( { celebrities: dbCelebrities });
    res.render("movies/new-movie.hbs", { celebrities: dbCelebrities });
    } catch (error) {
        console.log(error);
        next(error);
    } 
});

router.post("/movies/create", async (req, res, next)=> {
    try {
        dbNewMovie = await Movie.create(req.body);
        res.redirect("/movies");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get("/movies", async (req, res, next)=> {
    try {
        dbMovies = await Movie.find().populate("cast");
        res.render("movies/movies.hbs", { movies: dbMovies });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get("/movies/:id", async (req, res, next)=> {
    try {
        const movie = await Movie.findById(req.params.id).populate("cast");
        // const { _id, title, genre, plot, cast } = await Movie.findById(req.params.id).populate("cast");
        // const movie = {title, genre, plot, cast };
        // res.send(movie);
        res.render("movies/movie-details", movie);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get("/movies/:id/delete", async (req, res)=> {
    try {
        const dbMovie = await Movie.findByIdAndDelete(req.params.id);
        res.redirect("/movies")
    } catch (error) {
        console.log(error);
        next(error);
    }
});



router.get("/movies/:id/edit", async (req, res, next)=> {
    try {
        const { _id, title, genre, plot, cast } = await Movie.findById(req.params.id).populate("cast");
        const celebrities = await Celebrity.find().lean();
        markedCelebrities = markCelebritiesInCast(celebrities, cast);
        let movie = { _id, title, genre, plot, cast, markedCelebrities }

        // res.send(markedCelebrities);
        res.render("movies/edit-movie.hbs", movie);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

function markCelebritiesInCast(celebrities, cast){
    const celebrityIds = celebrities.map(e=> e._id.toString());
    const castIds = cast.map(e => e._id.toString());
    const castCelebrityIds = celebrityIds.filter(e => castIds.indexOf(e) > -1);
    celebrities.forEach((celebrity) => {
        if (castCelebrityIds.indexOf(celebrity._id.toString()) > -1) {
            celebrity.selected = "selected";
        }
    });
    return celebrities;
}


router.post("/movies/:id/edit", async (req, res, next)=> {
    try {
        const dbUpdate = await Movie.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after"})
        res.redirect("/movies");
    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;