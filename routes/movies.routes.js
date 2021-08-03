// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model.js'); // <== add this line before your routes
 
// GET route to retrieve and display all the books
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(allTheMoviesFromDB => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log('Retrieved books from DB:', allTheMoviesFromDB);
 
      res.render('movies-list.hbs', { movies: allTheMoviesFromDB});
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});
module.exports = router;