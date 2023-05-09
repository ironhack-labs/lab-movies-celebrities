const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
//Adding New movies 
router.get('/movies/create', async(req, res)=>{

try { let celebritiesDatabase = await Celebrity.find();
    res.render('movies/new-movie.hbs', {celebsDB: celebritiesDatabase});
} catch (error) {
    console.error(error);
}





})


router.post('/movies/create', (req, res)=>{
let {title, genre, plot, cast} = req.body;

async function createAMovie(){
try {
    let createdMovie = await Movie.create({title, genre, plot, cast})
    res.redirect('/');

} catch (error) {
    console.error(error);
}
}
createAMovie();
});

// Display all movies


router.get('/movies', (req, res)=>{

    async function loadAllMovies(){

        try {
            let moviesFromDb = await Movie.find();
            res.render('movies/movies.hbs', {allMovies: moviesFromDb})
            


        } catch (error) {
            console.error(error);
            
        }

    } 


loadAllMovies();
})








module.exports = router;