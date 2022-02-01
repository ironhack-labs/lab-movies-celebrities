// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(dbList => res.render('celebrities/celebrities.hbs', { celebrity: dbList }))
    .catch(err => console.log('Error while retrieving celebrities list: ', err))
});

router.get('/celebrities/create',(req, res, next) => {
 //Show a form to create a celebrity
 res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
 //	Send the data from the form to this route to create the celebrity and save it to the database
 const {name, occupation, catchPhrase} = req.body;

 Celebrity.create({name, occupation, catchPhrase})
 .then(() => res.redirect('/celebrities'))
 .catch(err => res.render('celebrities/new-celebrity'))
});


module.exports = router;