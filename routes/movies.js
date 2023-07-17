
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")
const router = require('express').Router()


router.get('/',(req,res)=>{
    Movie.find()
    .then((allMovies)=>{
        res.render('../views/movies/movies',{allMovies})
    })
    .catch(err=>{
        console.log(err)
    })
})


// router.get('/create',(req,res)=>{
//     res.render('../views/movies/new-movie')
// })



// //READ for 1 resource
// router.get('/:id',(req,res)=>{
//     console.log(req.params)
//     Book.findById(req.params.id)
//     .then((oneBook)=>{
//         res.render('book-info',oneBook)
//     })
// })

// router.get('/create',(req,res)=>{
//     Author.find()
//     .then((allAuthors)=>{
//         res.render('create-book',{allAuthors})

//     })
// })



router.get('/create', (req, res) => {
    Celebrity.find()
      .then(allCelebrities => {
        res.render('movies/new-movie', { allCelebrities });
      })
      .catch(err => {
        console.log(err);
        res.redirect('/'); 
      });
//   });
  
  router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(newMovie => {
        console.log(newMovie);
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/'); 
      });
  });
});

//get move by ID
router.get('/:id',(req,res)=>{
    
    console.log(req.params.id)
    Movie.findById(req.params.id).populate('cast')
    .then((oneMovie)=>{
        res.render('movies/movie-details',oneMovie)
    })
    .catch(err=>{
        console.log(err)
    })
})
// editing movies

router.get('/:id/edit',(req,res)=>{
    console.log(req.params)
     Movie.findById(req.params.id).populate('cast')
     .then((oneMovieToBeEdited)=>{
        console.log(oneMovieToBeEdited)
        res.render('movies/edit-movies',oneMovieToBeEdited)

     })
     .catch((err)=>{
        console.log(err)
     })
})

router.post('/:id/edit',(req,res)=>{
    console.log("req.body")
    console.log(req.body)
    console.log("req.params")
    console.log(req.params)

    const {title, genre, plot, cast} = req.body

    Movie.findByIdAndUpdate(req.params.id,{title, genre, plot, cast})
    .then((updatedMovie)=>{
        res.redirect('/movies')
    })
    .catch(err=>{
        console.log(err)
    })
})
//   router.get('/:id/edit', async (req, res) => {
//     try {
//       const movie = await Movie.findById(req.params.id);
//       const celebrities = await Celebrity.find();
  
//       res.render('movies/edit-movie', { movie, celebrities });
//     } catch (error) {
//       console.log(error);
//       res.redirect('/movies');
//     }
//   });
  
  
//   router.post('/:id', async (req, res) => {
//     try {
//       const { title, director, cast } = req.body;
//       await Movie.findByIdAndUpdate(req.params.id, { title, director, cast });
  
//       res.redirect(`/movies/${req.params.id}`);
//     } catch (error) {
//       console.log(error);
//       res.redirect('/movies');
//     }
//   });


//delete movies
router.post('/:id/delete', (req, res) => {
    const movieId = req.params.id;
  
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect('/movies');
      })
      .catch((error) => {
        console.log(error);
     
      });
  });





module.exports = router