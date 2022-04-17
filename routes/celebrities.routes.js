const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')

///Adding celebs

router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebs => {
            res.render('celebrities/celebrities', { celebs })
        })
        .catch(err => console.log(err))




});
router.get('/new-celebrities', (req, res) => {
    res.render('celebrities/new-celebrities')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celeb => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))

});



module.exports = router;