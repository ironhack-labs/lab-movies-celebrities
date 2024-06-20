const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities', async (req, res) => {
    try{
        let allCelebrities = await Celebrity.find();

        res.render('celebrities/celebrities.hbs', {celebrities: allCelebrities});
    }catch(error){
        console.log(error);
    }
});

router.get('/celebrities/create', async (req, res) => {
    try{
        let allCelebritiesCreate = await Celebrity.find();

        res.render('celebrities/new-celebrity.hbs', {celebrities: allCelebritiesCreate});
    }catch(error){
        console.log(error);
    }
});

router.post('/celebrities/create', async (req, res) => {
    try{
        const {name, occupation, catchPhrase} = req.body;

        await Celebrity.create({name, occupation, catchPhrase});
        res.redirect("/celebrities");
    }catch(error){
        console.log(error);
    }
});

module.exports = router;