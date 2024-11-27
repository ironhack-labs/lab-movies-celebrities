const express = require(`express`)
const router = express.Router()
const Movie = require(`../models/Movie.model`)
const Celebrity = require(`../models/Celebrity.model`)

router.get(`/movies/create`, (req, res) => {
    Celebrity.find().then(celebrities => {
        console.log(`Celebrities: ${celebrities}`)
        res.render(`movies/new-movie`, { celebrities })
    })
        .catch(error => {
            console.log(`Error celebrities`, error)
            res.render(`error`, { error })
        })
})

router.post(`movies/create`, (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie.create({ title, genre, plot, cast }).then(() => res.redirect(`/movies`))
        .catch(error => {
            console.log(`Error creating movie`, { error })
            res.render(`movies/new-movie`, { error })
        })
})

module.exports = router