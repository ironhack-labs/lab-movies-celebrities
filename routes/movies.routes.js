const app = require("../app");
const Celebrities = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model")

const router = require("express").Router();

router.get('/', (req,res)=>{
    Movies  
        .find()
        .populate('cast')
        .then(moviesFromDB=>res.render('./movies/movies',{moviesFromDB}))
        .catch(err=>console.log(err))
})

router.get('/create', (req,res)=>{
    Celebrities
        .find()
        .then(celeb => res.render('./movies/new-movie', {celeb}))
        .catch(err=>err)
    // res.render('./movies/new-movie')
})

router.post('/create', (req,res)=>{
    const { title, genre, plot, cast } = req.body
    Movies
        .create({ title, genre, plot, cast })
        .then(()=> res.redirect('/movies'))
        .catch(err=>err)

})

router.get('/:id/', (req,res)=>{
    Movies
        .findById(req.params.id)
        .populate('cast')
        .then(foundMovie=>res.render('./movies/movie-details', foundMovie))
        .catch(()=>res.render('not-found'))

})

router.post('/:id/delete', (req,res)=>{
    Movies
        .findByIdAndDelete(req.params.id)
        .then(()=>res.redirect('/movies'))
        .catch(()=>res.render('not-found'))

})

router.get('/:id/edit', (req,res)=>{
    Movies
     .findById(req.params.id)
     .populate('cast')
     .then(found  => {console.log(found), res.render('./movies/edit-movie',found)})
     .catch(err=>res.send(err))
})

router.post('/:id/', (req,res)=>{ 
    const movieID = req.params.id
    const {_id, title, genre, cast } = req.body
   Movies
    .findByIdAndUpdate(req.params.id, {_id, title, genre, cast }, {new:true})
    .then(()=> res.redirect(`/movies/${movieID}`))
    .catch(err=> console.log(err))
})


module.exports = router;