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
    const {title,genre,plot,author} = req.body;
    console.log("REQ:BODY",req.body)
    Movie.create({title,genre,plot,author})
    .then((newMovie)=>{
        console.log("NEW MOVIE HAS BEEN ADDED TO DB",newMovie)
        return Movie.findByIdAndUpdate(newMovie._id,{$push:{cast:author}},{new:true})
    })
    .then(()=>{
        res.redirect('/movies')
    })
    .catch(err=>console.log("ERROR EN POST MOVIES CREATE",err))
})

//Crear el GET para movies
router.get('/movies',(req,res,next)=>{
    Movie.find()
    .then((allMoviesInDB)=>{
        console.log('ALL MOVIES IN DB',allMoviesInDB)
        res.render('movies/movies',{movies:allMoviesInDB})
    })
    .catch(err=>conole.log("ERROR EN READING ALL MOVIES FROM DB", err))
})


//Crear el GET para movies/:id

router.get('/movies/:movieId',(req,res,next)=>{
    const {movieId} = req.params;
    Movie.findById(movieId)
    .populate('cast')
    .then((theMovie)=>{
        console.log("MOVIE SELECTED",theMovie)
        res.render('movies/movie-details',{movie:theMovie})
    })
})


//Deleting movies
router.post('/movies/:id/delete',(req,res,next)=>{
    const movieId = req.params.id;
    console.log("REQ.PARAMS!!!!!",movieId)
    Movie.findByIdAndRemove(movieId)
    .then(()=>res.redirect('/movies'))
    .catch(err=>console.log('ERROR EN DELETING MOVIES',err))
})


//GET URL PARA EDITAR
router.get('/movies/:id/edit',(req,res,next)=>{
    const {movieId} = req.params;
    Movie.findById(movieId)
    .then((allCelebritiesFromDB)=>{
        Celebrity.find()
    })
    .then(()=>{
        res.render('movies/edit-movie')
    })
})


module.exports = router