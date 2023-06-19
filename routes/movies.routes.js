const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get('/movies/create', (req, res, next) => { res.render('movies/new-movie') });

router.post('/movies/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;  //defining what req.body contains
    const newMovie = new Movie({  //defining new instance of celebrity basing on its model
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
        })

      newMovie.save() //save a new movie in DB
        .then(ifNewMovieIsSaved => {
        res.redirect('/movies');
        })
        .catch((err) => {
            res.render('movies/new-movie')
            console.log(err);
        });
    })

    

//IT6: GET mthd, Adding New Movies:
router.get('/movies/create', (req, res) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities });
        })
        .catch((error) => {
            console.log('Something went wrong. Please try again.', error);
            res.redirect('/movies');
        });
});

    //IT6: POST mthd Send the data from the form to this route to create the movie 

    router.post('/movies/create', (req, res) => {

        const { title, genre, plot, cast } = req.body;
    
        const newMovie = new Movie({
            title,
            genre,
            plot,
            cast
        });
    
        newMovie.save()
            .then((ifNewMovieIsSaved) => {
                res.render('/movies', { movies } );
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/movies/create');
            });
    });
    

    module.exports = router;

