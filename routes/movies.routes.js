const router = require("express").Router();
module.exports = router;
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/movies/create', (req, res) => {
    
    Celebrity.find()
        .then(data=>{
            
            res.render('movies/new-movie',{celebInfo : data})
        })
    })

router.post('/movies/create', (req, res) =>{
    
    const {name, genre, plot, cast} = req.body

    Movie.create({name, genre, plot, cast})
        .then(data => {console.log('New movie just added:', data)
        res.redirect('/movies')
    })
    .catch(err => {console.log(err)
                    res.render('movies/new-movie')
    });

})

router.get('/movies',(req, res) => {

    Movie.find()
        .then(data =>{
            res.render('movies/movies',{ movie : data})
        })

})

router.get('/movies/:id',(req, res)=>{

    const movieId = req.params.id
    
    Movie.findById(movieId)
        .populate('cast')
        .then(data=>{
            console.log('AQUIIIIIII',data)
            res.render('movies/movie-details', {data})})
        .catch(err =>console.log(err));


})


router.post('/movies/:id/delete',(req, res)=>{
    const movieId = req.params.id
    Movie.findByIdAndDelete(movieId)
    .then(data=>{
        console.log('delete:', data.name)
        res.redirect('/movies')
    })
    .catch(err =>console.log(err));
})



/* router.get('/movies/:id/edit',(req, res)=>{

    
    Celebrity.find()
    .then(data=>{
        res.render('movies/edit-movie',{celebrity:data})
    })
    .catch(err =>console.log(err));

}) */

router.get('/movies/:id/edit',(req, res)=>{

    const movieId = req.params.id
    const movieInfo = Movie.findById(movieId)
    const celebrity = Celebrity.find()
    
    Promise.all([movieInfo,celebrity])
    .then(([data,celebrity])=>{
        
        res.render('movies/edit-movie',{data, celebrity})
    })
    .catch(err =>console.log(err));
    

})

router.post('/movies/:id/edit',(req,res)=>{
    const {name, genre, plot, cast} = req.body
    const movieId = req.params.id
    Movie.findByIdAndUpdate(movieId,{name, genre, plot, cast},{new:true})
        .then(data=>{
            console.log('Movie document:',data)
            res.redirect('/movies')
        })
        .catch(err =>console.log(err));

})


