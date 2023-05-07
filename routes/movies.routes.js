const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrities =require('../models/Celebrity.model')

router.get('/', (req, res, next) => {
    Movie
    .find()
    .then(movie=>res.render('movies/movies', {movie: movie}))
    .catch(err => console.log(console.error())) 
})

router.get('/create', (req, res, next) => {
     Celebrities
       .find()
       .then(celebrity =>res.render('movies/new-movie', {celebrity})) 
       .catch(err => console.log(err))  
}) 

router.post('/create', (req, res, next) => {
    const{title, genre, plot, cast} = req.body
    Movie
     .create({title, genre, plot, cast})
     .then(() => res.redirect('/movies'))
     .catch(err=>console.log(err), res.render('movies/new-movie'))
 })

router.get('/:id', (req, res, next) => {
    const {id} = req.params
    
    Movie
      .findById(id)
      .populate('cast')
      .then(detailsMovie => {
        res.render('movies/movie-details', detailsMovie)
    })
      .catch(err => console.log(err))
})  

router.post('/:_id/delete', (req, res, next) => {
  const { _id } = req.params
   Movie
    .findByIdAndDelete(_id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err)) 
})

router.get('/:_id/edit', (req, res, next) => {
  const {_id} = req.params 
  Movie
    .findById(_id)
    .populate('cast')
    .then(
      movieToEdit => {
        Celebrities.find()
        .then(
          cebsData => {

            movieToEdit._doc.cast.forEach(castMember => {
              cebsData.forEach(ceb => {
                if(castMember.name === ceb.name) {
                  ceb.isSelected = true;
                }
              })
            })
      
            let editData = {
              movieData: {...movieToEdit._doc},
              cebsData: {...cebsData}
            }
            
            res.render('movies/edit-movie', {editData})
          }
        )
        .catch(err => console.log(err))
      })
    .catch(err => console.log(err))
})

router.post('/:_id/edit', (req, res, next) => {
  //res.send(req.body)
  const {title, genre, plot, cast} = req.body
  const {_id} = req.params

  Movie
  .findByIdAndUpdate(_id, {title, genre, plot, cast})
  .then(() => res.redirect(`/movies/${_id}`))
  .catch(err => console.log(err))
})
 

module.exports = router;