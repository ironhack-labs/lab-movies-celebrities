// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/movies/create", (req, res) => {
    res.render("movies/new-movie")
  })
  
  router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast} = req.body;

    Movie.create({ title, genre, plot, cast})
      
      .then(movie => res.render("movies/new-movie", movie))
      .catch(err => console.log(err))

    })

    router.get("/movies", (req, res) => {
      
        Celebrity.find()
            .then(allTheMovies => res.render("movies/movies", { allTheMovies }))
            .catch(err => console.log(err))
          
          });


module.exports = router;
