const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// create a celebrity
router.get('/celebrities/create', (req, res) =>{
    res.render('celebrities/new-celebrity')
})

router.post("/celebrities/create", (req, res)=>{
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
    .then(() => {
        res.redirect("/celebrities")
    })
    .catch(error =>{
        console.log(`We have an error creating a celebrity`, error)
        res.redirect("/celebrities/create")
    })
})

// list of celebrities
router.get('/celebrities', (req, res) => {

    Celebrity.find()
    .then(celebritiesArr => {
        res.render('celebrities/celebrities', {celebritiesArr})
    })
    .catch(error => console.log(error))
})

// display celebrity details
router.get('/celebrities/:id', (req, res) => {
    const {id} = req.params;

    Celebrity.findById(id)
    .then(celebrity => {
        console.log(celebrity)
        res.render('celebrities/celebrity-details', celebrity)
    })
    .catch(error => console.log(error))
})

// edit celebrity
router.get("/celebrities/:id/edit", async (req, res) => {
    const {id} = req.params;

    Celebrity.findById(id)
    .then((celebrity) => {
        res.render("celebrities/edit-celebrity", celebrity);
    })
    .catch (error => console.log(error))
})

router.post('/celebrities/:id/edit', (req, res) => {
    const {id} = req.params;
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.findByIdAndUpdate(id, {name, occupation, catchPhrase})
    .then(() => {
        res.redirect(`/celebrities/${id}`)
    })
    .catch(error => console.log(error))
})

// delete movies
router.post("/celebrities/:id/delete",(req, res)=>{
    const {id} = req.params;

    Celebrity.findByIdAndDelete(id)
        .then(()=>{
            res.redirect("/celebrities")
        })
        .catch(error => console.log(`We have an error deleting a celebrity`, error))    
})

module.exports = router;