// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('./../models/Movie.model')

/* GET Movies page */
router.get("/movies/create", (req, res) => res.render("./../views/movies/new-movie"))

/*POST Movies page*/

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies/list'))
        .catch(err => console.log(err))
})
/*GET Movies list */
router.get('/movies/list', (req, res) => {

    Movie
        .find()
        .select('title')
        .then(movies => res.render('./../views/movies/movies', { movies }))
        .catch(err => console.log(err))
})
/*GET movie details*/
router.get('/movie/details/:movie_id', (req,res)=> {
    
    const { movie_id } = req.params

    
    Movie
        .findById(movie_id)        
        // .then(themovie => console.log('themovie', themovie)) 
        .populate('cast')         
        .then(theMovie => res.render('movies/movie-details', theMovie))
        .catch(err => console.log(err))})

module.exports = router;
/**
Iteration #9: Deleting Movies
Now that we have a list of movies, a movie details page, and a page to create new movies, 
we only have 2 features left to implement: editing movies and deleting them. 
Since deleting is simpler, let's start with that.


Route /movies/:id/delete		HTTP Verb POST	Description Delete a specific movie
	
Steps we will follow in this iteration:
In the movies/movie-details.hbs file:
Add a <form> tag that makes a POST request to /movies/:id/delete where the :id is replaced by the actual id of the movie.
Add a <button> tag inside the form so that it can be submitted.
Create the /movies/:id/delete POST route in your routes/movies.routes.js file
In the route:
Use the Movie model's findByIdAndRemove() method to delete the specific movie by its id.
If everything is good (.then()), redirect to the list of movies page
If there's an error, catch it */