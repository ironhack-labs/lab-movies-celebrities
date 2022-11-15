// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// getting our Schema:
const Celebrity = require('../models/Celebrity.model');

//GETting route to render our new celebrity(it'll go on front end) end point
router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity.hbs'));

//POST
router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    //try insert req.body 
    Celebrity.create({name, occupation, catchPhrase})
    //.then(celebrityFromDB => console.log(`New celebrity created: ${celebrityFromDB .name}.`))
    .then(() => res.redirect('/celebrities'))
    // ????
    .catch(error => res.render('celebrities/new-celebrity.hbs'));
})

//LIST all
router.get('/celebrities', (req, res) => {
    Celebrity.find()
    .then(allCelFromDB => {
        console.log('Retrieved celebrities from DB:', allCelFromDB );
           res.render('celebrities/celebrities.hbs');
      })
  
})
module.exports = router;