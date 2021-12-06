const router = require('express').Router();

const Movie = require('../models/Movie.model');


//Hacer el GET de la URL para crear películas.

router.get('/movies/create',(req,res,next)=>{
    res.send('Hello')
})







module.exports = router