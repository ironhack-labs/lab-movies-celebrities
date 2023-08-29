// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


// all your routes here

router.get("/movies/create",(req, res,next)=>{
   Celebrity.find()
        .then(celebritiesFromDB=> {
        const data = {
            celebrities : celebritiesFromDB
        }
        res.render("movies/new-movie", data)
    })
    .catch((e) => {
            console.log("Error getting list of celebrities from DB", e);
            next(e);
        });
})

router.post("/movies/create", (req, res, next) => {
  
    const { title, genre, plot, cast } = req.body;
    
    if(!title || !genre || !plot|| !cast){
      return  res.render('movies/new-movie', {msg: "Please provide all of the info"})
    }

  Movie.create({ title, genre, plot, cast })
    //.then(bookFromDB => console.log(`New book created: ${bookFromDB.title}.`))
    .then(() => res.redirect('/movies'))
    .catch(error => res.render('celebrities/new-celebrity', error));
});


module.exports = router;