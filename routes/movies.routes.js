// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


// all your routes here

router.get("/movies", (req, res) => {
    res.render("./movies/movies.hbs");
});

router.get("/movies", (req, res, next) => {
    return Movie.find()
      .then((allTheMoviesFromDB) => {
        // -> allTheBooksFromDB is a placeholder, it can be any word
        //   console.log("Retrieved books from DB:", allTheBooksFromDB);
        res.render("movie/movies.hbs", { books: allTheMoviessFromDB });
      })
      .catch((error) => {
        console.log("Error while getting the books from the DB: ", error);
        // Call the error-middleware to display the error page to the user
        next(error);
      });
  });
module.exports = router;