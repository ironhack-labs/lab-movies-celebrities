// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model');




router.get("/celebrities", async (req, res, next) => {
    
    try {
        const allCelebrities = await Celebrity.find();
    
        res.render("celebrities/celebrities", {allCelebrities});

    } catch (err) {
        console.log(err);
    }

});

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
}); 

router.post('/celebrities/create', async (req, res) => {
    try {
        const {name, occupation, catchPhrase} = req.body;

        const newCeleb = await Celebrity.create({name, occupation, catchPhrase});

        res.redirect('/celebrities');
    
    } catch (error) {
        console.log(err);
        res.render('celebrities/new-celebrity')
    }
});




module.exports = router;


