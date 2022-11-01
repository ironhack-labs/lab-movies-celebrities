const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/celebrities/create", (req, res, next) =>
    res.render("celebrities/new-celebrity"))



router.post("/celebrities/create", async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase } = req.body


        await Celebrity.create({ name, occupation, catchPhrase })

        res.redirect("/celebrities/create")
    } catch (error) {
        console.log(error)
        next(error)
    }
})


router.get("/celebrities", async (req, res, next) => {
    try {
        const allCelebs = await Celebrity.find();
        res.render("celebrities/celebrities.hbs", { allCelebs })
    } catch (error) {
        console.log(error)
        next(error)
    }
})




module.exports = router;


