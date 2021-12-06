const router = require('express').Router();

const Movie = require('../models/Movie.model');

const Celebrity = require('../models/Celebrity.model')


//Hacer el GET de la URL para crear películas.

router.get('/movies/create',(req,res,next)=>{
    Celebrity.find()
    .then((dbCelebrities) =>{
        console.log(dbCelebrities)
        res.render('movies/new-movie',{dbCelebrities})
    })
    .catch(err=>console.log("ERROR EN GETTING MOVIES CREATE",err))
})


//Hacer el POST en la URL para meter los datos a la DB

router.post('/movies/create',(req,res,next)=>{
    const {title,genre,plot} = req.body;
    Movie.create({title,genre,plot})
    .then((newMovie)=>{
        console.log("NEW MOVIE HAS BEEN ADDED TO DB",newMovie)
        res.redirect('/movies')
    })
    .catch(err=>console.log("ERROR EN POST MOVIES CREATE",err))
})




module.exports = router