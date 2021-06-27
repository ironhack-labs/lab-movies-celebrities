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
        .then(console.log('req.body =', [req.body]))
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


module.exports = router;
/* remember to link these two new files to either app.js or routes/index.js so your server has access to them. */
/*
Create the /celebrities/create POST route in routes/celebrities.routes.js.
In that route we have to create an instance of the Celebrity model
(don't forget, we should get all the info from the form through req.body)
If there is an error, render the celebrities/new-celebrity view so the user can try again and
If there is no error, redirect to the page with the list of celebrities.
This route will be created in the next iteration /celebrities
In the views/index.hbs view file:
Add a link that goes to the page you just created with the form to create a new celebrity.
 */