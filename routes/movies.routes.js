const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

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

        .catch(ifThereIsAnError => {
            res.render('movies/new-movie', console.log({ error }));
    })
});


//IT6: GET mthd, Adding New Movies:
router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then((celebsFromDB) => {
            res.render('movies/new-movie')
    })

    .catch(ifThereIsAnError => { 
        console.log('Something was wrong. Please try again.')
        res.render('movies/create', console.log({ error }));
    })
})

//IT6: POST mthd Send the data from the form to this route to create the movie 
router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;

    const newMovie = new Movie ({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: cast 
    });

    //and save it to the database
    newMovie.save()
        .then(() => {
            res.redirect('/movies');
    })
        .catch((err) => {
            console.log(err);
      });
  });


module.exports = router;


    
/* ITERATION 6

app.get('/movies/create', (req, res) =>{
    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie', {celebrities});
        })
        .catch((error) => {
            console.log(error);
            res.redirect('/');
        });
});
*/
