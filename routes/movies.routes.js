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

router.post("/create", isLoggedIn, (req, res, next) => {
    Movie.create({
        title: req.body.title, 
        genre: req.body.genre, 
        plot: req.body.plot, 
        celebrity: req.body.celebrity,
        addedBy: req.session.currentUser._id,
        image: req.body.image
    })
    .then((result)=>{
        console.log ("A new movie was added:", result);
        res.redirect("/movies");
    })
    .catch((err)=>{
        next(err);
    })
});

router.post("/delete/:id",  isLoggedIn, async (req, res, next)=>{
    const movie = await Movie.findById(req.params.id);

    if(!movie.addedBy.equals(req.session.currentUser._id)){
        res.redirect ("/movies");
        return;
    }

    Movie.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        next(err);
    })

});

router.get("/edit/:id", isLoggedIn, async (req, res, next) => {
    try{
        const celebrities = await Celebrity.find();
        const movie = await Movie.findById(req.params.id).populate("celebrity");

        if(!movie.addedBy.equals(req.session.currentUser._id)){
            res.redirect ("/movies");
            return;
        }

        celebrities.forEach((celebrity)=>{
            if(celebrity._id.equals(movie.celebrity._id)){
                celebrity.isInMovie = true;
                console.log(celebrity);
            }
        });

        res.render("movies/edit-movie",{celebrities, movie})

    } catch (err){
        next(err);
    }
});
  
router.post("/update/:id", isLoggedIn, (req, res, next)=>{
    const {title, genre, plot, celebrity, image} = req.body;
    
    Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, celebrity, image})
    .then(()=>{
      res.redirect("/movies/" + req.params.id);
    })
    .catch((err)=>{
      next(err);
    })
});

router.get("/:id", isLoggedIn, (req, res, next) => {
    Movie.findById(req.params.id).populate("celebrity").populate("addedBy")
    .then((movie)=>{
        const deleteable = movie.addedBy.equals(req.session.currentUser._id);
        res.render("movies/movie-details", {movie, deleteable});
    })
    .catch((err)=>{
        next(err);
    })
});


module.exports = router;