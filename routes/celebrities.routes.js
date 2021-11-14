// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    const newCelebrity = new Celebrity({ name, occupation, catchPhrase })
  newCelebrity.save()
  .then((celebrity) => {
    res.redirect('/celebrities');
  })
  .catch((error) => {
    console.log("----------------------->", error)
    res.render('celebrities/new-celebrity');
  })
});


router.get('/celebrities', (req, res, next) => {

    Celebrity.find()
    .then(allTheCelebrities => { 
      console.log(allTheCelebrities) 
      res.render('celebrities/celebrities', { allTheCelebrities })
      
    })
    .catch(err => console.log("Ojo cuidao buscando las celebrities hay un", err))
    
});



module.exports = router;
