
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {

    res.render('celebrities/new-celebrity')
})
router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })




        .catch(() => {
            res.render('celebrities/new-celebrity')
        })
})

router.get("/celebrities", (req, res) => {
    Celebrity
        .find()
        .then((celebFromDb) => {

            const celebrities = {
                celebArray: celebFromDb
            }

            res.render("celebrities/celebrities", celebrities)
        })
        .catch(err => (err))
})

router.get('/celebrities/celebritie-details/:celeb_id', (req, res) => {

    const { celeb_id } = req.params

    Celebrity
        .findById(celeb_id)
        .then(celebFromDb => {
            res.render('celebrities/celebritie-details', celebFromDb)
        })
        .catch(err => console.log(err))
})


router.get('/celebrities/:celeb_id/update-celebrities', (req, res) => {

    const { celeb_id } = req.params

    Celebrity
        .findById(celeb_id)
        .then(celebFromDb => {
            const celebrities = {
                celebArray: celebFromDb
            }
            res.render('celebrities/update-celebrities', celebrities)


        })
        .catch(err => console.log(err))
})



router.post('/celebrities/:celeb_id/update-celebrities', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { celeb_id } = req.params

    Celebrity
        .findByIdAndUpdate(celeb_id, { name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))


})



router.post('/celebrities/:celeb_id/delete', (req, res) => {
    const { celeb_id } = req.params
    Celebrity
        .findByIdAndDelete(celeb_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})



module.exports = router;