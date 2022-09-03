const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    CelebrityModel.create({ name, occupation, catchPhrase })
        .then((newCelebrity) => {
            console.log(newCelebrity)
            res.redirect('/')
        })

})

module.exports = router;