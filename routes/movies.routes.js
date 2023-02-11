const express = require('express')
const router = express.Router()

const Movie = require('../models/Movies.model')

router.get('/create', (req, res) => {
    res.send('prueba create movie')
})

router.get('/', (req, res) => {
    res.render('./movies/movies')
})

module.exports = router;