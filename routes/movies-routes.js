// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model")
const Movie = require("./../models/Movie.model")


// all your routes here



router.get("/movies", (req, res)=>{

    Movie
    .find()
    .then((allMovies)=> res.render("movies/movies", { allMovies }))
    .catch(err => console.log(err))
})


router.get("/movies/create", (req , res)=>{
    
    Celebrity
    .find()
    .then(allCelebrities => res.render("movies/new-movie", {allCelebrities} ))
    .catch(err => console.log(err))
    
})

router.post("/movies/create", (req , res)=>{

    const { title, genre, plot, cast } = req.body
    // console.log("TITLE Y GENRE DE LA MOVIE---------", title, genre, plot, castMovie)
    
    Movie
    .create({title, genre, plot, cast})
    .then(() => res.redirect("/movies"))
    .catch(err => console.log(err))
     
})

router.get("/movies/:id_movie", (req, res)=> {

    const {id_movie} = req.params
    console.log("id_movie-----------", id_movie)

    Movie
    .findById(id_movie)
    .populate("cast")
    .then(movie => res.render("movies/movie-details", movie ))
    .catch(err => console.log(err))
})



router.post("/movies/:id_movie/delete", (req, res)=>{

    const {id_movie} =  req.params

    Movie
    .findByIdAndDelete(id_movie)
    .then(()=> res.redirect("/movies"))
    .catch(err => console.log(err))
})


router.get("/movies/:id_movie/edit", (req, res)=>{

       const { id_movie } =  req.params
       console.log(id_movie)

    Movie
    .findById(id_movie)
    .then(movieUpdate => res.render("movies/edit-movie", movieUpdate ))
    .catch(err => console.log(err))

})

router.post("/movies/:id_movie/edit", (req, res)=>{


  const { title, genre, plot }= req.body

  const { id_movie} = req.params     


  
  Movie
    .findByIdAndUpdate(id_movie, { title, genre, plot })
    .then(() => res.redirect(`/movies/${id_movie}`))
    .catch(err => console.log(err))

})




module.exports = router;