const express = require(`express`)
const router = express.Router()
const Celebrity = require(`../models/Celebrity.model`)

router.get(`/create`, (req, res) => {
    res.render(`celebrities/new-celebrity`)
})

router.post(`/create`, (req, res) => {
    console.log(req.body)
    const { name, occupation, catchPhrase } = req.body

    Celebrity.create({ name, occupation, catchPhrase })
        .then((data) => {
            console.log(data)
            res.redirect(`/celebrities`)

        })
        .catch((error) => res.render(`celebrities/new-celebrity`, { error }))

})

router.get(`/`, (req, res) => {
    Celebrity.find().then(celebrities => {
        res.render(`celebrities/celebrities`, { celebrities })
    })
        .catch(error => {
            res.render(`error`, { error })
        })
})

module.exports = router