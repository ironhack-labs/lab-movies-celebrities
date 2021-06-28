const router = require("express").Router();
const MovieModel = require('../models/Movie.model')
const CelebrityModel = require('../models/Celebrity.model')

//LIST MOVIES
router.get("/movies", (req,res,next) => {
    MovieModel.find()
    .then((allMovies) => {
        res.render("movies/movies.hbs", {allMovies})
    }).catch((err) => {
        next(err)
    });
})


//CREATE MOVIE - GET
router.get("/movies/create", (req, res, next) => {
    CelebrityModel.find()
    .then((allCelebrities) => {
        res.render("movies/new-movie.hbs", {allCelebrities});
    }).catch((err) => {
        next(err)
    });
})
//CREATE MOVIE - POST
router.post("/movies/create", (req,res,next) => {
    const {title, genre, plot, cast} = req.body
    MovieModel.create({title, genre,plot,cast})
    .then((result) => {
        res.redirect("/movies")
    }).catch((err) => {
        next(err)
    });
})

//MOVIE DETAILS

router.get('/movies/:id', (req,res, next) => {
    const {id} = req.params
    MovieModel.findById(id)
    .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details.hbs', {movie})
        })
        .catch((err) => {
            next(err)
        })
})




router.get('/movies/:id/edit', (req,res, next) => {
    const {id} = req.params;
    MovieModel.findById(id)
    .populate('cast')
    .then((movie) => {
        CelebrityModel.find()
        .then((allCelebrities) => {
            res.render('movies/edit-movie.hbs', {movie, allCelebrities})

        }).catch((error) => {
            next(error)
        });
        
    })
    .catch((err) => {
        next(err)
    })
})


// EDIT MOVIE - POST
router.post('/movies/:id/edit', (req, res, next) => {
let movieId  = req.params.id
const { title, genre, plot, cast} = req.body

MovieModel.findByIdAndUpdate(movieId , { title, genre, plot, cast})
  .then(() => {
      res.redirect('/movies')
  })
  .catch(() => {
      next('Edit failed')
  })
});


//DELETE
router.post('/movies/:id/delete', (req, res, next) => {
  let movieId = req.params.id

  MovieModel.findByIdAndDelete(movieId)
    .then(() => {
        res.redirect('/movies') 
    })
    .catch(() => {
        next('Deleting specific todo failed')
    })
});


module.exports = router;