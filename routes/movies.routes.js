// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model');

// middleware
function isLoggedIn(req, res, next) {
    if(req.session.currentUser) { // if current user found
        next()
    } else {
        res.redirect("/auth/login")
    }
  }
  

// all your routes here
router.get('/create', isLoggedIn, (req, res)=> {
    console.log('create get')
    Celebrity.find()
        .then(allCelebrities => {
            res.render('movies/new-movie', {allCelebrities});
    
        }).catch((error)=> {console.log('upsie, this is not cool!')})
})



router.get('/', isLoggedIn, (req, res) => {
    Movie.find()
    .then(allMovies => {
        console.log(allMovies)
      res.render('movies/movies', {allMovies})
    }).catch((error)=> {console.log('upsie, this is not cool!')})
});
  
//
  
router.post('/create', isLoggedIn, (req, res)=> {
    console.log('create post')

    const {title, genre, plot, cast} = req.body
    
    Movie.create({title, genre, plot, cast})
        .then(newMovie => res.redirect('/movies'))
        .catch(error => {
            console.log('movie not created ', error)
            res.render('movies/new-movie')
        })
    
});

router.post('/:id/delete', isLoggedIn, (req, res)=> {
    Movie.findByIdAndDelete(req.params.id)
    .then(deletedMovie => res.redirect("/movies"))
    .catch(error=> console.log(error))
})

// edit movie
router.route('/:id/edit')
.get(isLoggedIn, (req, res)=> {
    Movie.findById(req.params.id)
        // .populate('cast')
        .then(movie => {
            Celebrity.find()
                .then(allCelebrities => {
                    const celebritiesFiltered = allCelebrities.filter((celebrity)=> {
                        console.log('=====', movie.cast)
                        if (movie.cast.includes(celebrity._id)) {
                            return false;
                        }
                        return true;
                    })
                    console.log(celebritiesFiltered)
                    res.render('movies/edit-movie', {movie, allCelebrities: celebritiesFiltered})
                })
        })
        .catch(error => console.log('problem here'))
})
.post(isLoggedIn, (req, res)=>{
    const {title, genre, plot, cast} = req.body
    Movie.findByIdAndUpdate(
      req.params.id,
      {title, genre, plot, cast}
    )
    .then(updateMovie => res.redirect(`/movies/${req.params.id}`))
    .catch(error => console.log(error))
  })

// show details of movie

router.get('/:id', isLoggedIn, (req, res) => {
    const {id} = req.params

    Movie.findById(id)
        .populate('cast')
        .then(movie => {
            console.log(movie)
            res.render('movies/movie-details', {movie})
        }).catch((error) => console.log('movie not found', error))
})

//.then(movie => Celebrity.find(movie))

module.exports = router;
