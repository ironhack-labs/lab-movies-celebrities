const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// mostrar celebrities
router.get('/celebrities', (req, res) => {
    //res.send('holi!')
    Celebrity
        .find()
        .then(cele => res.render('celebrities/celebrities', { cele }))
        .catch(err => console.log(err))
})

//crear celebrities
router.get('/celebrities/create', (req, res) => {
    //res.send('caracoli!')
     res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity'))
})


module.exports = router;