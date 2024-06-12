const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')







router.get('/celebrities/create', (req, res,) => {

    res.render('celebrities/new-celebrity')

});


router.post('/celebrities/create', (req, res,) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

});






module.exports = router;