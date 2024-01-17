const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const isLoggedIn = require("../utils/route-guard");


router.get("/", (req, res, next) => {
    Movie.find()
    .then((movies)=>{
        res.render("movies/movies", {movies});
    })
    .catch((err)=>{
        next(err);
    })
});

router.get("/new", isLoggedIn, (req, res, next) => {
    Celebrity.find()
    .then((celebrities)=>{
        res.render("movies/new-movie", {celebrities});
    })
    .catch((err)=>{
        next(err);
    })
});

router.post("/create", isLoggedIn, async (req, res, next) => {
    
    try{
        const movie = await Movie.create({
            title: req.body.title, 
            genre: req.body.genre, 
            plot: req.body.plot, 
            cast: req.body.cast,
            addedBy: req.session.currentUser._id,
            image: req.body.image
        });
    
        const celebrityUpdate = await Celebrity.updateMany(
            {_id: {$in: req.body.cast }},
            {$push: {movies : movie}},
            {multi: true}
        );

        req.flash("successMessage", `You successfully added ${movie.title} in the Book Collection.`);
        res.redirect("/movies");

    } catch (err){
        req.flash("errorMessage", "Sorry, something went wrong " + err);
        res.redirect("/movies/new");
    }

});

router.post("/delete/:id",  isLoggedIn, async (req, res, next)=>{

    try{
        const theMovie = await Movie.findById(req.params.id);

        if(!theMovie.addedBy.equals(req.session.currentUser._id)){
            res.redirect ("/movies");
            return;
        }

        const celebrityUpdate = await Celebrity.updateMany(
            {_id: {$in: theMovie.cast}},
            {$pull: {movies: theMovie._id}},
            {multi: true}
        );

        const movie = await Movie.findByIdAndDelete(req.params.id);
        req.flash("successMessage", `Your deletion was successful.`);
        res.redirect("/movies");
        
    } catch(err){
        next(err);
    }
});

router.get("/edit/:id", isLoggedIn, async (req, res, next) => {
    try{
        const celebrities = await Celebrity.find();
        const movie = await Movie.findById(req.params.id).populate("cast");

        if(!movie.addedBy.equals(req.session.currentUser._id)){
            res.redirect ("/movies");
            return;
        }

        celebrities.forEach((celebrity)=>{
            movie.cast.forEach((celeb)=>{
                if(celebrity._id.equals(celeb._id)){
                    celebrity.isInMovie = true;
                    console.log(celebrity);
                }
            })
        });

        res.render("movies/edit-movie",{celebrities, movie})

    } catch (err){
        next(err);
    }
});
  
router.post("/update/:id", isLoggedIn, async (req, res, next)=>{
    const {title, genre, plot, cast, image} = req.body;
    console.log(cast);

    try{
        const theMovie = await Movie.findById(req.params.id);
        const celebrityDelete = await Celebrity.updateMany(
            {_id: {$in: theMovie.cast}},
            {$pull: {movies: theMovie._id}},
            {multi: true}
        );

        const movie = await Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast, image}, {new: true});
        const celebrityUpdate = await Celebrity.updateMany(
            {_id: {$in: req.body.cast}},
            {$push: {movies : movie}},
            {multi: true}
        );

        req.flash("successMessage", `You successfully updated ${movie.title}.`);  
        res.redirect("/movies/" + req.params.id);
    } catch(err){
        next(err);
    }
});

router.get("/:id", isLoggedIn, (req, res, next) => {
    Movie.findById(req.params.id).populate("cast").populate("addedBy")
    .then((movie)=>{
        const deleteable = movie.addedBy.equals(req.session.currentUser._id);
        res.render("movies/movie-details", {movie, deleteable});
    })
    .catch((err)=>{
        next(err);
    })
});


module.exports = router;