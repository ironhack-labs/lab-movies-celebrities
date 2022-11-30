const router = require("express").Router();
// Import my model
const Celebrity = require('../models/Celebrity.model');

// Create a celebrity
router.get('/celebrities/create', (req, res, next) => { // <- Makes this link available fpr the user to click on
    res.render ('celebrities/new-celebrity.hbs');       // <- The view which is shown in the browser
})

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    // console.log(req.body)
   
    Celebrity.create({ name, occupation, catchPhrase })
    .then(createdCeleb => {
        res.redirect('/celebrities')
    })
    .catch(err => {
        res.render('celebrities/new-celebrity.hbs')
    }) 
})
// Get celebrity
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(celebrities => {
    res.render('celebrities/celebrities.hbs',{celebrities})
  })
  .catch(err => {
    res.render('celebrities/new-celebrity.hbs')
})    
})
// get celebrity detail
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
