const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', (req,res,next)=>{
    res.render('celebrities/new-celebrity');
})

router.post("/celebrities/create", async (req, res, next) => {
    try {
        const celebrity =  await Celebrity.create({...req.body});
        res.send("Celebrity created: " + celebrity);
        // res.redirect("/celebrities");
    } catch (error) {
        next(err);
    }
})

module.exports = router;