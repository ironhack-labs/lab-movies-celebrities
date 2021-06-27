const Celebrity = require("../models/Celebrity.model");
const app = require("../app");
const { find } = require("../models/Celebrity.model");
const router = require("express").Router();

/* GET create celebrity */
router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'))
/* POST create celebrity */
router.post('/celebrities/create', (req, res) => {
    
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findOne({ name })
        .then(celebrity => {

            if (celebrity) {
                res.render('celebrities/new-celebrity', { errorMessage: '* Ya existe' })
                return
            }

            Celebrity
                .create({ name, occupation, catchPhrase })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})



/* GET celebrities's list */
router.get('/celebrities', (req, res) => {
   
    Celebrity 
        .find()
        .select('name')
        .then(celebrities => res.render('celebrities/celebrities', {celebrities}))
        .catch(err => console.log(err))
})



module.exports = router