// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// Require Celebrity Model
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res)=>{
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res)=>{

    const {name, occupation, catchPhrase} = req.body;

    async function createCelebrityInDb(){
        try{
            let createCelebrity = await Celebrity.create({name, occupation, catchPhrase});

            res.redirect('/celebrities');
        }
        catch(error){
            console.log(error);
        }
    }
    createCelebrityInDb();
});

router.get('/celebrities', (req, res)=>{
    async function findAllCelebritiesFromDb(){
        try{
            let allCelebritiesFromDb = await Celebrity.find();

            res.render('celebrities/celebrities.hbs'), {celebrities: allCelebritiesFromDb};
        }
        catch(error){
            console.log(error);
        }
    }
    findAllCelebritiesFromDb();
})



module.exports = router;