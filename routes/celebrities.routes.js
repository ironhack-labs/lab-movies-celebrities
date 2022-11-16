// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
// all your routes here
const Celeb = require('../models/Celebrity.model.js');
//GET 
router.get("/celebrities/create", (req, res, next) => {
        res.render('celebrities/new-celebrity.hbs')
      })
//POST
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase} = req.body;
    Celeb.create({ name, occupation, catchPhrase})
    .then(celebfromDb => res.render('celebrities/celebrities.hbs',{celeb:celebfromDb}))
    .catch(error => next(error));
});
// GET All
router.get('/celebrities/', (req, res, next) => {
    const { name, occupation, catchPhrase} = req.body;
    Celeb.create({ name, occupation, catchPhrase})
    Celeb.find()
    .then(celebfromDb => res.render('celebrities/celebrities.hbs',{celeb:celebfromDb}))
    .catch(error => next(error));
});
 




module.exports = router;

