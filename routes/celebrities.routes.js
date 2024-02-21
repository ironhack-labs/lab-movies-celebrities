const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
//item 4
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(allCelebrities => {
            res.render("celebrities/celebrities", { celebrities: allCelebrities })
        })
        .catch(err => {
            console.error(`Error has been occured during the listing all celebrities: ${err}`)
            next(err)
        })
})
//item 3
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name: name, occupation: occupation, catchPhrase: catchPhrase })
        .then(dbCelebrity => {
            console.log(`Created celebrity is:${dbCelebrity}`);
            res.redirect('/celebrities')
        })
        .catch(err => {
            console.error(`Error has been occured during the creating new celebrity: ${err}`)
            res.render("celebrities/new-celebrity")
        })
})

//Bonus for Celebrity
// see the details of a specific celebrity

router.get("/celebrities/:id", (req, res, next) => {
    const celebrityId = req.params.id;
    Celebrity.findById(celebrityId)
        .then(dbCelebrity => {
            res.render("celebrities/celebrity-details", { celebrity: dbCelebrity })
        })
        .catch(err => {
            console.error(`Error has been occured during detail of the celebrity: ${err}`)
            next(err)
        })
})
//edit details
router.get("/celebrities/:celebrityId/edit", (req, res, next) => {
    const { celebrityId } = req.params;//destructor
    //const celebrityId=req.params.celebrityId (alternative way)

    Celebrity.findById(celebrityId)
        .then(dbCelebrity => {
            res.render("celebrities/edit-celebrity", { celebrity: dbCelebrity })
        })
        .catch(error => next(error));
});

//part-2 post method update

router.post("/celebrities/:celebrityId", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    const celebrityId = req.params.celebrityId;
    Celebrity.findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase }, { new: true })
        .then(updatedCelebrity => res.redirect(`/celebrities/${celebrityId}`))
        .catch(error => next(error));
})
//delete method
router.post("/celebrities/:celebrityId/delete", (req, res, next) => {
    const { celebrityId } = req.params;

    Celebrity.findByIdAndDelete(celebrityId)
        .then(() => res.redirect('/celebrities'))
        .catch(error => next(error));
});

module.exports = router;

