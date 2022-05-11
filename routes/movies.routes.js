const router = require("express").Router();
const MovieModel = require ("../models/Movie.model")



//1. crear una ruta get

router.get ("/create", (req, res, next) =>{


    res.render("movies/new-movie.hbs")
})


// 2.crear una ruta post movies/create
router.post("/create", (req, res, next) => {
 
    console.log (req.body)

    const { title, genre, plot, cast } = req.body
    
    MovieModel.create({
       title,
       genre,
       plot,
       cast
    })
    
    .then((response) => {
    res.redirect ("/movies")
    })
    .catch((err) =>{
        next (err)
    })

})


//3. crear ruta get para listar

router.get ("/", (req, res, next) =>{
    MovieModel.find()
    .then ((peliculas) =>{

        res.render("movies/movies.hbs", {
            listPeliculas: peliculas
        })
    })
    .catch((err) => {
        next(err)
    })
})

//edit

router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findById(id)

    

    res.render("movies/edit-movie.hbs", {
      movie,
    })
  } catch(err) {
    next(err)
  }
});

router.post("/:id/edit", (req, res, next) => {

  const { title,genre,plot } = req.body;
  const { id } = req.params;
  
  MovieModel.findByIdAndUpdate(id, {
    title,
    genre,
    plot,
  })
    .then((movie) => {
      
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => {
      next(err);
    });
});



//delete

router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;

  try {
    
    await MovieModel.findByIdAndDelete(id);

   
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});




// Crear ruta dinámico

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
  
    
    MovieModel.findById(id)
      .then((movie) => {
        
  
        console.log(movie)
        
        res.render("movies/movie-details.hbs", {
          movie,
        });
      })
      .catch((err) => {
        next(err);
      });
  });






module.exports = router;

