const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// create a movie
router.get('/movies/create', (req, res) =>{

    Celebrity.find()
    .then(celebritiesArr => {
        res.render("movies/new-movie", {celebritiesArr})
    })
    .catch(err=>{
        console.log(`We have an error creating a movie`,err)
    })
})

router.post('/movies/create', (req, res)=>{
    const{ title, genre, plot, cast} = req.body

    Movie.create({ title, genre, plot, cast})
    .then(() => {
        res.redirect("/movies")

    })
    .catch(error =>{
        console.log(`We have an error creating a movie`, error)
        res.redirect("/movies/new-movie")
    })
})

// list of movies
router.get('/movies', (req, res) => {

    Movie.find()
    .then(moviesArr => {
        res.render('movies/movies', {moviesArr})
    })
    .catch(error => console.log(error))
})

// display movie details
router.get('/movies/:id', (req, res) => {
    const {id} = req.params;

    Movie.findById(id)
    .populate('cast')
    .then(movie => {
      
        res.render('movies/movie-details', movie)
    })
    .catch(error => console.log(error))
})

// delete movies
router.post("/movies/:id/delete",(req, res)=>{
    const {id} = req.params;

    Movie.findByIdAndDelete(id)
        .then(()=>{
            res.redirect("/movies")
        })
        .catch(error => console.log(`We have an error deleting a movie`, error))    
})

// edit movies
router.get("/movies/:id/edit", async (req, res) => {
    const {id} = req.params;
    
    try {
        const movie = await Movie.findById(id).populate('cast');
        const celebrities = await Celebrity.find()
        // const notCasted = filterNotCasted(movie, celebrities);
        const celebritiesNotCasted = celebrities.filter((celebritie) => {
            let counter = 0;
            movie.cast.forEach((celebritieCasted) => {
              if (celebritie._id.toString() ===  celebritieCasted._id.toString()) {
                counter++;
              }
            });
            if (counter >= 1) {
              return false;
            } else {
              return true;
            }
          });
        
          console.log(celebritiesNotCasted)
        res.render("movies/edit-movie", {celebritiesNotCasted,movie})
    } catch (error) {
        console.log(error)
    }
})

router.post('/movies/:id/edit', (req, res) => {
    const {id} = req.params;
    const {title, genre, plot, cast} = req.body;
    
    Movie.findByIdAndUpdate(id,{title, genre, plot, cast})
    .then(() => {
        res.redirect(`/movies/${id}`)
    })
    .catch(error => console.log(error))
})


// function filterNotCasted(movie, celebrities) {
//     return celebrities.filter(celebrity =>  {
//         movie.cast.forEach(celebrityInMovie => {
//             if (celebrityInMovie.name === celebrity.name) {
//                 return false;
//             }
//         })
//         return true;
//     })
// }


module.exports = router;



        // celebrities={celebrities,isInTheMovie}
        // const allCelebrities =[]

//********************************************************************** */
// const celebritiesCasted = ()=>{
//     movie.cast.forEach((actor,index)=>{

//         celebrities.forEach((celebrity)=>{

//             // console.log(`what is happening====>`,actor._id.toString()===celebrity._id.toString())                
//             if(actor._id.toString()===celebrity._id.toString()){
//                 allCelebrities.push({celebrity, isInTheMovie: true})

//             }else{
//                 allCelebrities.push({celebrity, isInTheMovie: false})
//             }

//         })
//     })

// }
// celebritiesCasted()
//********************************************************************** */