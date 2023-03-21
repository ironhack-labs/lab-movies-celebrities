// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require ("../models/Movie.model")

// all your routes here


router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(celebsArr => {

            const data = {
                celebs: celebsArr
            };

            res.render("movies/new-movie", data);
        })
        .catch(e => {
            console.log("error getting celebrities ", e);
            next(e);
          });
})

router.post("/movies/create", (req,res,next) =>{
    //console.log(req.body)
    Movie.create(req.body)
    .then(movieArr=>{
        res.redirect("/movies")
    })
    .catch(e => {
        console.log("error getting new movie ", e);
        next(e);
      });
})




module.exports = router;