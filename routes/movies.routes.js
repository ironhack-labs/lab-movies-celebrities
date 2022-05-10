const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity =  require("../models/Celebrity.model");

router.get("/movies/create", (req, res) => { 
    Celebrity.find()
    .then((celebrity) => {
    //   console.log(celebrity);
      res.render('movies/new-movie', { celebrity });
    })
    .catch((err) => next(err));
});

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast  } = req.body;
    Movie.create({title, genre, plot, cast })
    .then(() => res.redirect('/movies'))
    .catch(() => res.render("movies/new-movie "));
});


router.get("/movies", (req, res) => {
    Movie.find()
      .then((movies) => res.render("movies/movies", { movies}))
      .catch((err) => console.log(err));
  });

router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
    .populate("cast") 

    .then((movies)=>{
       res.render("movies/movie-details", movies)
    })
    .catch((err)=> console.log(err))
})


router.post("/movies/:id/delete", (req, res, next)=>{
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
    .then(()=>{
        res.redirect("/movies")
    })
    .catch((err)=> console.log(err))
})


//nao consegui acabar
router.get("/movies/:id/edit", (req,res,next)=>{
    const { id } = req.params;
    Movie.findById(id)
    Celebrity.find()

    .then((movies)=> res.render("movies/edit-movie", movies))
})




module.exports = router;