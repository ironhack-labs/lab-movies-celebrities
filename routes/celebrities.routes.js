// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

// ---------- [NEW CELEBRITIES] ---------- 

router.get("/create", (req, res) => {

    //console.log("celebrities test")
    //res.send("celebrities");
    res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(newCelebrity => res.redirect(`/celebrities`))
        .catch(err => res.redirect("celebrities/new-celebrity"))
})

// ---------- [LIST CELEBRITIES] ---------- 

router.get('/', (req, res) => {

    Celebrity

        .find()

        .then(

            //console.log("celebrities page test")
            //res.send("celebrities");
            celebrities => res.render('celebrities/celebrities', { celebrities })

        )

        .catch(err => console.log(err))
})

module.exports = router;
