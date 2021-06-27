// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

/* GET celebrities page */
router.get("/celebrities/create", (req, res) => res.render("./../views/celebrities/new-celebrities"))

/*POST celebrities page*/

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body
    // Celebrity
    //     .findOne({ name })
    //     .then(celebrity => {

    //         if (celebrity) {
    //             res.render('/celebrities/create', { errorMessage: ' Celebrity already registered' })
    //             return
    //         }
    //     })
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(console.log('req.body =', [req.body]))
        .then(() => res.redirect('/celebrities/list'))
        .catch(err => console.log(err))
})
/*GET celebrities list */
router.get('/celebrities/list', (req, res) => {

    Celebrity
        .find()
        .select('name')
        .select('occupation')
        .select('catchPhrase')
        .select('_id')
        .then(celebrities => res.render('./../views/celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})

module.exports = router;
