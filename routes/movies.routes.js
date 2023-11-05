
const router = require("express").Router()

const Movie = require('./../models/Movie.model')
const Celebritie = require("../models/Celebrity.model")  



router.get('/create', (req, res)=>{
   
    Celebritie                  //quiero datos del modelo celebritie(requerido arriba) porque son los que necesito en el formulario 
   .find()                          //si renderizo algo antes tengo que pillar los datos, aunque abajo me redirija a esa vitsa, donde lo estoy renderizando es aqui asique los necesito 
   .then(celebrities=>{
    res.render('movies/new-movies', {celebrities})   
   })
   .catch(err => console.log(err)) 
   
   
})


router.post('/create', (req, res) =>{               //es el post del get anterior

    const {title, genre, plot, cast} = req.body    //aqui le paso a req.body los datos de movie
    // console.log('que tengo en ',req.body) como?
    Movie
    .create({title, genre, plot, cast})      //crea una movie(con el formato del movieSchema) con los datos puestos en el formulario en /create, renderizado arriba 
    .then(res.redirect("/movies"))             
    .catch(err => console.log(err))             
    
})

router.get('/', (req, res) => {

    Movie
    .find()                     //cojo informacion de movie
    .populate('cast')
    .then(moviesfromDB =>
        res.render('movies/movies', {moviesfromDB}))    //renderizo la vista de movies
        
    .catch(err => console.log(err))

})



router.get('/:id', (req,res) => {
    
    const {id} = req.params
    
    //console.log(`textoooooooo------------------------------`,id)  
    Movie
    .findById(id)
    .populate('cast')       //arriba solo paso el id, hace falta esto para luego hacer un each cast y pedir le name
    .then(moviesfromDB => 
        res.render ('movies/movie-details', moviesfromDB) )
    .catch(err => console.log(err))                             
   

})

router.post('/:id/delete', (req,res) => { 
    const {id} = req.params

    Movie
    .findByIdAndRemove(id)          
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})



router.get('/:id/edit', (req, res) => {             

    const {id} = req.params

    Movie
    .findById(id)
    .populate('cast')
    .then(moviesfromDB => res.render('movies/edit-movie', moviesfromDB))
    .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {

    const {title, genre, plot, cast} = req.body     //aqui cojo los datos enviados del cliente en el form
   
    const {id} = req.params                         //aqui cojo el id por la url
    
    Movie
    .findByIdAndUpdate(id, {title, genre, plot, cast} )      
    .then( res.redirect(`/movies/${id}`))            
    .catch(err => console.log(err))
})






module.exports = router

