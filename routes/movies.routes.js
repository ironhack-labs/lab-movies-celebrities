const router = require('express').Router();
const movie = require('../models/Movies.model')
const celebrity = require('../models/Celebrity.model')

// GET route to retrieve and display all the books
router.get('/movies', (req, res) => {
    //1. Traer los datos de la base de datos
    //Los metodos usados con mongoose nos dan una Promise
    movie.find()
    .then((lasMovies)=>{
        console.log("mov",lasMovies);
     //2. UNA VEZ que tenemos los datos mandalos al templete
     res.render('movies/movies', {movie: lasMovies});      
    })
    .catch(err=>console.log(err));
});

//Create route to /movies/create
router.get("/movies/create", (req,res)=>{
    celebrity.find() 
      .then(celebrities => {
          res.render('movies/new-movie.hbs', { celebrities });
      })
      .catch(err => {
          console.log(err);
      })
})

//Guardar una nueva pelicula 
router.post("/movies/create", async (req, res, next) => {
    try{
    const { title, genre, plot, cast } = req.body;
    const newMovie = await movie.create({ 
        title, 
        genre, 
        plot, 
        cast
    })
    res.redirect("/movies")
    }catch(err){
        console.log(err);
    }
  });

  //Obteber movie por id
  router.get('/movies/:id', async(req, res) => {
    try{
        const {id} = req.params
        const datos = await movie.findById(id)
        .populate('cast')
        res.render('movies/movie-details', datos)
    }catch(err){
        console.log(err);
    }
  })

  //Borrar movie
    router.post('/movies/:movieId/delete', (req, res) => {
    const { movieId } = req.params;
    movie.findByIdAndRemove(movieId)
      .then(() => res.redirect('/movies'))
      .catch(error => {
        console.log(err);
      })
  })


  //Editar movie
  router.get("/movies/:id/edit", async (req, res, next) => {
    const id = req.params.id
    try {
        const mov = await movie.findById(id).populate("cast")
        const cel = await celebrity.find()
        const celebritiesNo = filterCelebritiesNo(mov, cel)
        res.render("movies/edit-movie", { mov, celebritiesNo })
    } catch (error) {
        console.log(error)
    }
  })

  router.post("/movies/:id/edit", (req, res, next) => {
    const {id} = req.params
    const { title, genre, plot, cast } = req.body
    const mov = {
        title,
        genre,
        plot,
        cast
    }
    movie.findByIdAndUpdate(id, mov)
    .then(createdMovie => {
        res.redirect(`/movies/${id}`)
    })
    .catch(err => {
        next(err)
    })
  })
  
  function filterCelebritiesNo(mov, cel) {
    return cel.filter(celebrity => {
        mov.cast.forEach(movieCelebrity => {
            if (movieCelebrity.name === celebrity.name) {
                return false
            }
        })
        return true
    })
  }
module.exports = router;