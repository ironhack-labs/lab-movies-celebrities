
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')


//Iteration #3: Adding New Celebrities

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
});


router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => {
            res.redirect(`/celebrities`)
        })
        .catch(err => console.log(err))
});


//Iteration #4: Listing Our Celebrities

router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrity => {

            res.render('celebrities/celebrities', { celebrity: celebrity })
        })
        .catch(err => console.log(err))
})



//Bonus
//details of a specific celebrity

router.get('/celebrities/:id', (req, res, next) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/celebrity-details', celebrity)
        })
        .catch(err => console.log(err))

})


//Update existing celebrities
router.get('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => console.log(err))

});


router.post('/celebrities/:id/edit', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body
    const { id } = req.params
    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities`))
        .catch(err => console.log(err))

});


//Delete

router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))

});


module.exports = router;