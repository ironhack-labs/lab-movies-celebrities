// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')


// all your routes here

router.get("/celebrities/create", async (req, res, next) => res.render("celebrities/new-celebrity"))

router.post("/celebrities/create", async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase } = req.body;
        
   /*      if(!(name || occupation || catchPhrase)){
            res.redirect('celebrities/new-celebrity')} */

        const createdCelebrity = await Celebrity.create({ name, occupation, catchPhrase });


        res.redirect(`/celebrities`)
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.get("/celebrities", async(req, res, next) => {
    try {
        const celebs = await Celebrity.find();
        res.render('celebrities/celebrities', {celebs})
        
    } catch (error) {
        console.log(error);
        next(error);        
    }
})











module.exports = router;