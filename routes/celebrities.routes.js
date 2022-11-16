const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


// create celebrities
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
});

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
        .then(() => res.redirect("/celebrities"))
        .catch((error) => res.render("celebrities/new-celebrity"));
});


// get celebrities
router.get("/celebrities", (req, res, next) => {
    return Celebrity.find()
        .then((allCelebrities) => {
            res.render("celebrities/celebrities.hbs", { celebrity: allCelebrities });
        })
        .catch((error) => {
            console.log("Error while getting the Celebrities from the DB: ", error);
        });
});


// Get celebrity details
router.get("/celebrities/:id", (req, res) => {
    const id = req.params.id

    Celebrity.findById(id)
        .then(celebrity => {
            res.render("celebrities/celebrity-details", { celebrity })
        })
        .catch(err => {
            console.log(err)
        })
})

// Delete celebrity
router.post("/celebrities/:id/delete", (req, res) => {
    const id = req.params.id

    Celebrity.findByIdAndRemove(id)
        .then(deletedCelebrity => {
            res.redirect("/celebrities")
        })
        .catch(err => {
            console.log(err)
        })
})

// Edit celebrity
router.get("/celebrities/:id/edit", (req, res) => {
    const id = req.params.id

    Celebrity.findById(id)
        .then(celebrity => {
            res.render("celebrities/edit-celebrity", { celebrity })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/celebrities/:id/edit", (req, res) => {
    const id = req.params.id
    const { name, occupation, catchPhrase } = req.body

    const celebrity = {
        name,
        occupation,
        catchPhrase
    }

    Celebrity.findByIdAndUpdate(id, celebrity)
        .then(createdCelebrity => {
            res.redirect(`/celebrities/${id}`)
        })
        .catch(err => {
            console.log(err)
        })
})





module.exports = router;
// create and read
// link a = get

// edite and delete
// form  = post
