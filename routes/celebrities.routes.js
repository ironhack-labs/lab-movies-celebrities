// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here

/* //* Test Route
router.get("/test", (req, res, next) => {
    res.render("testview");
}); */

//* Celebrity Create Route
//? GET Variant
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

//? POST Variant
router.post("/celebrities/create", async (req, res, next) => {

    try {
        const {name, occupation, catchPhrase} = req.body;

        const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
        res.redirect(`/celebrities`);
        
    } catch (error) {
        console.log(error)
        res.redirect(`/celebrities/create`);
    };
});

//* Celebrity List Route

router.get("/celebrities", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("celebrities/celebrities", {celebrities});
        
    } catch (error) {
        console.log(error);
        next(error);
    };
    
})

module.exports = router;