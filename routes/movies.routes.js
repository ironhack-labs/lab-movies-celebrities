const router = require("express").Router();
const Movie = require('../models/Movie.model.js');


  
//Get Route to show the create form
router.get('/movies/create', (req, res, next) => {
  res.render('movies/new-movie');
});


 //post route to receive the info from the form and add it to the DB
 router.post('/movies/create', (req, res, next) => {
  const { title, genre, plot, cast  } = req.body;
  
 })

 Movies.create({title, genre, plot, cast})
      .then((movie) => {
       
        res.redirect('/movies')
      })
      .catch((err) => {res.render('movie/new-movie')
      next(err);
  });


  //route to get all celebrities
router.get('/movies', (req, res, next) => {
  Movies.find()
    .then((Showallmovies) => res.render("movies/movies.hbs", { Showallmovies }))
    .catch((err) => {
      
      next(err);
    });
}); 



module.exports = router;









 