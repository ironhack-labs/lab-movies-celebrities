const celebrityRouter = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const mongoose = require('mongoose');

// GET route to display form to create new celeb.
celebrityRouter.get('/celebrities/create', (req, res, next )=> {
   
    res.render('celebrities/new-celebrity.hbs');
})
// POST route to process data from the form . Add data to DB.
celebrityRouter.post('/celebrities/create', (req, res, next )=> {
    console.log(req.body);
     const { name, occupation,catchPhrase }= req.body;
Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
})
.then( (newCelebrity ) => {
    console.log('A new Celebrity was added to the DB: ', newCelebrity)
    res.redirect('/celebrities');
})
.catch( (error) => {
    console.log('Error while adding celebrity to the DB: ', error);
});
});

// GET Route to display celebrities

celebrityRouter.get('/celebrities' , (req, res, next) => {

    Celebrity.find()
    .then( (celebritiesFromDB) => {
        console.log(`There are ${celebritiesFromDB.length} in the database.`)
        res.render('celebrities/celebrities.hbs', {celebrity: celebritiesFromDB});
    })
    .catch( (error) => {
        console.log('Error while getting celebrities from the database: ', error);
    });
});









module.exports = celebrityRouter;