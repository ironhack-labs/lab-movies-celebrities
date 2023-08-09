// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celeb = require ("../models/Celebrity.model.js");


// all your routes here
router.get('/celebrities/create', (req,res)=>{
    console.log("create page")
    res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create', async (req,res)=>{
    const {name, occupation, catchPhrase} = req.body;

    try{
        const createACeleb = await Celeb.create({name,occupation,catchPhrase});
        res.redirect('/celebrities');

    }
    catch(error){
        console.log(error)
        res.render ('celebrities/new-celebrity.hbs')
    }
});

router.get('/celebrities', async (req, res)=>{
    try{

        const celebList = await Celeb.find();
        res.render('celebrities/celebrities.hbs', {celeb: celebList});
    }
    catch(error){
        console.log(error)
    }
});

module.exports = router;