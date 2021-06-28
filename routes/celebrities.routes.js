const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model")
// all your routes here

router.get("/celebrities/create", (req, res) => { res.render("./../views/celebrities/new-celebrity"); });

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities/list'))
        .catch(err => console.log(err))

})
router.get('/celebrities/list', (req, res) => {


    Celebrity
        .find()
        .select('name')
        // .select('occupation')
        // .select('catchPhrase')
        // .then(elem => { console.log('name') })
        .then(celeb => res.render("./../views/celebrities/celebrities", { celeb }))
        .catch(err => console.log(err))

})





module.exports = router;