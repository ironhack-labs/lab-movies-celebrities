const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');


// all your routes here


// router.get('/create',(req,res) =>{
//     res.render('new-movie')
// });

router.get('/create',(req,res) =>{

  Celebrity.find()
    .then(celeb => 
      res.render('new-movie', {celeb}))
    .catch(Err => {
      return console.log('error', Err);
    })
});

router.post('/create',(req,res) => {
    const {title, genre, plot, cast} =req.body;
    Movie.create({title, genre, plot, cast})
    .then(()=>res.redirect('/movies'))
    .catch(Err => console.log('error', Err))
});

router.get('/',(req,res) =>{
    Movie.find()
    .then(movie =>
    res.render('movies', {movie}))
    .catch(Err => console.log('error', Err))
});

router.get('/:id',(req,res) =>{
    const {id} =req.params;

    Movie.findById(id)
    .populate('cast')
    .then(movie =>
    res.render('movie-details', {movie}))
    .catch(Err => console.log('error', Err))
});

router.post('/:id/delete', (req, res) => {

    Movie.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/movies'))
    .catch(Err => console.log('error', Err))
  });

  router.get('/:id/edit', (req, res) => {
    let celebrities;
  Celebrity.find()
  .then((data) => (celebrities = data));

    Movie.findById(req.params.id)
      .then(movie => {
        res.render('edit-movie', {movie, celebrities})
      })
      .catch(err => console.log(err))
  });

  router.post('/:id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast },{new: true})
    .then(() => res.redirect('/movies'))
    .catch(Err => console.log('error', Err))
  });

 

module.exports = router;