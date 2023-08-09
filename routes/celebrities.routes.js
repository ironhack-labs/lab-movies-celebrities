const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get('/', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("celebrities/celebrities", { celebrities });
    } catch (error) {
        console.log(error);
    }
});



/*router.get ('/', (req,res, next) => {
    Celebrity.find()
    .then (celebrities => {
    res.render("celebrities/celebrities", {celebrities})    
    })
    .catch((error) => {
        console.log(error)
    })
})*/

router.get("/create", (req,res, next) => {
    res.render("celebrities/new-celebrity")
})
router.post("/create", async (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    
    try {
        await Celebrity.create({ name, occupation, catchPhrase });
        res.redirect("/celebrities");
    } catch (error) {
        console.log("celebrity error:", error);
        
    }
});






/*router.get("/create", (req,res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/create", (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then (()=> {
        res.redirect("/celebrities")
    })

  console.log("catch the celebrity error")
        res.render("celebrities/new-celebrity")
    })*/





































module.exports = router;