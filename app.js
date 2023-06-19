// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);



// ITERATION 3

const Celebrity = require('./models/Celebrity.model');

app.get('/celebrities/create', (req, res) =>{
    res.render('celebrities/new-celebrity');
})


app.post('/celebrities/create', (req, res) =>{

    const {name, occupation, catchPhrase} = req.body;

    // Create a new celebrity using the provided data
    const newCelebrity = new Celebrity({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    });


    // Save the new celebrity to the database
    newCelebrity
        .save()
        .then(celeb => 
            // Redirect to the celebrities page after successful creation
            res.redirect('/celebrities')
        )
        .catch(err => {
            // Handle the error and render the new-celebrity view again
            res.render('celebrities/new-celebrity', { error: "please, try again to insert a new celebrity" });
        });
});

// ITERATION 3 (END)

// ITERATION 4

app.get('/celebrities', (req,res) => {

    Celebrity.find()
        .then((celebrities)=>{
            res.render('./celebrities/celebrities.hbs', {celebrities});
        })
        .catch(() => console.log("error fetching celebrities"))
})

// ITERATION 4 (END)



// ITERATION 5

const Movie = require('./models/Movie.model');

// ITERATION 5 (END)




// ITERATION 6

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


app.post('/movies/create', (req, res) =>{

    const {title, genre, plot, cast} = req.body;

    // Create a new movie using the provided data
    const newMovie = new Movie({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    });

    // Save the new movie to the database
    newMovie
        .save()
        .then(
            // Redirect to the celebrities page after successful creation
            res.redirect('/views/movies/movies.hbs')
        )
        .catch(err => {
            // Handle the error and render the new-celebrity view again
            res.render('movies/new-movie', { error: "please, try again to insert a new movie" });
        });
});

// ITERATION 6 (END)



// ITERATION 7

app.get('/movies', (req,res) => {

    Movie.find()
        .then((movies)=>{
            res.render('./movies/movies', {movies});
        })
        .catch(() => console.log("error fetching movies"))
})

// ITERATION 7 (END)


// ITERATION 8

app.get('/movies/:id', (req,res) => {

    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('cast')
        .then((movie)=>{
            //const movieDetails = movie;
            res.render('./movies/movie-details', {movie});
            console.log(movie.cast)
        })
        .catch((error) => {
        console.log("error fetching movies", error);
        res.render('error');
        });
})

// ITERATION 8 (END)



// ITERATION 9 - Delete Movie

// app.post('/movies/:id/delete', (req,res) => {

//     const movieId = req.params.id;

//     Movie.findByIdAndRemove(movieId)
//         .then(res.redirect ('/views/movies/movies'))
//         .catch((error) => {
//         console.log("error deleting movie", error);
//         res.render('error');
//         });
// })

// ITERATION 9 (END)




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
