// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require(`../models/Celebrity.model`);
// all your routes here

router.get("/celebrities", async (req, res, next) => {
    try{
        let celebrities = await Celebrity.find();
        res. render (`celebrities/celebrities`, {celebrities});
    } catch (error){
        next(error)
    }
});

router.get (`/celebrities/create`, (req, res) => res.render(`celebrities/new-celebrity`));

router.post (`/celebrities/create`, async (req,res,next) => {
    try{
        const {name, occupation, catchPhrase} = req.body
        await Celebrity.create({name, occupation, catchPhrase})
      
     res.redirect(`/celebrities`);   
    } catch (error){
        console.log (error);
        next(error);
    }
});


module.exports = router;