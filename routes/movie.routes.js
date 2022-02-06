const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');
const Cele=require('../models/Celebrity.model')

// GETT Creation
router.get('/crearM', (req, res) => {
    res.render('movie/moviecreate')
})

//POST Creation
router.post('/crearM', (req, res) => {

    const { title, genre, plot,cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movie/listaM'))//////no funciona xq no quiere FIEstaaaaaaa
        .catch(err => console.log(err))
})
//GET LIsTA
router.get('/listaM', (req, res, next) => {
    Movie
        .find()
        .then(movies => res.render('movie/movielist', { movies }))
        .catch(err => console.log(err))
});// si no hay nada añadido......nada que ver pero ahi hay una pagina 

////Details
router.get('/detallesM/:movie_id',(req,res)=>{
    const{movie_id}=req.params
    Movie
    .findById(movie_id)
    .populate('Cele')///ignoro si funciona tengo muuuuuuuuchas dudas
    .then(movie=> res.render('movie/moviedetails',movie))
    .catch(err=>console.log(err))
})///// supongo que funciona, no tengo manera de comprobarlo, cado que que no funciona lo anterior

////Modificar

//GETTTTT
router.get('/movie/:movie_id/edit', (req, res, next) => {
   
    const { movie_id } = req.params
   Movie
        .findById(movie_id)
        .then(movie => {
            console.log(movie)
            res.render('movie/movieupdate', movie)
        })
        .catch(err => console.log(err))
});

//POST

router.post('/movie/:movie_id/edit', (req, res, next) => {
    
    const { movie_id } = req.params
    const { title, genre, plot, cast } = req.body
    console.log(req.body)
    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast }, { new: true })

        .then(() => res.redirect(`/listaM`))
        .catch(err => console.log(err))
});/////MARAVILLOSO ¿como hago un enclace a esta pagina?//////



//ELIMINAAAAAAR ojala que tmabien las dudas XD

router.post('/eliminar/:movie_id',(req,res)=>{
    const {movie_id}=req.params
    Movie
    .findByIdAndDelete(movie_id)
    .then(()=>res.redirect('/movie/movielist'))
    .catch(err=>crossOriginIsolated.log(err))
})// si hubier algo que eliminar, igual hasta funciona


module.exports = router;