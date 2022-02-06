const router = require("express").Router();
const Celebrity = require('../models/celebrity.model');
const Movie = require('../models/movie.model')

//Adding New Movies

router.get("/movies/create", (req, res, next) => { 
    
    Celebrity
        .find()
        .then(celebrities => res.render("movies/new-movies", { celebrities }))
        .catch(err => console.log(err))
        
  });


router.post('/movies/create', (req, res, next) =>{
    const {title, genre, plot, cast } = req.body

    Movie
        .create ({title, genre, plot, cast})
        .then(()=> res.redirect('/movies'))
        .catch(err=> console.log (err))
});


// movies list


router.get('/movies', (req, res, next)=> {
    Movie
        .find()
        .then (movies => res.render('movies/movies',{ movies}))
        .catch (err=> console.log (err))
});


// movie Details


router.get ('/movies/details/:_id', (req, res, next)=>{
    const {_id} = req.params

    Movie
        .findById(_id)
        .populate ('cast')
        .then (movie => res.render ('movies/details', movie))
        .catch(err => console.log(err))

})

// delete movies

router.post('/movies/:_id/delete', (req, res) => {
    const { _id } = req.params

    Movie
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router;