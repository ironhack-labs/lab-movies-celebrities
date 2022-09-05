const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.get('/', (req, res, next) => {
    CelebrityModel.find()
        .then((celebrities) => {
            console.log(celebrities)
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch((err) => next(err));
})

router.post('/create', (req, res) => {
    const { _id, name, occupation, catchPhrase } = req.body
    CelebrityModel.create({ _id, name, occupation, catchPhrase })
        .then((newCelebrity) => {
            console.log(newCelebrity)
            console.log(newCelebrity._id)
            res.redirect('/celebrities')
        })
        .catch((err) => next(err));

})

module.exports = router;