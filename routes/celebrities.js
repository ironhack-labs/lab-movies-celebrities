const router = require("express").Router()
const Celebrity = require('../models/celebrity.model')

// GETT Creation
router.get('/crear', (req, res) => {
    res.render('celebrity/create-celebrity')
})

//POST Creation
router.post('/crear', (req, res) => {

    const { name, ocupation, catchPhrase} = req.body

    Celebrity
        .create({ name, ocupation, catchPhrase })
        .then(() => res.redirect('/celebrity/list-celebrity'))
        .catch(err => console.log(err))

})

module.export = router