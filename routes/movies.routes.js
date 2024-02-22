const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();


router.get ('/', async (req,res) => {
    try{
        const allMovies = await Movie.find()
    res.render("movies/movies", {allMovies})}   
    catch(error){
        console.log("error",error)
    }
    })


router.get("/create",async (req,res) => {
    try{
        const movieCelebrities = await Celebrity.find();
        res.render("movies/new-movie", {movieCelebrities})
    }
    catch(error){
    console.log(error)
    }
        
    })

    router.get('/movies/create', (req, res) => {
        res.render('movies/new-movie.hbs');
    });    
router.post("/create", async (req, res, next) => {
    try{
       const {title, plot, genre, cast} = req.body;
    console.log(cast)  
    await Movie.create({title, genre, plot, cast}).populate("cast")
    res.redirect('/movies', { movie })
    }
   catch(error){
        console.log("movie error")
   }

    })

     router.get('/:id', async (req, res, next) => {
        try {
            const movieID = req.params.id;
            
            const movie = await Movie.findById(movieID).populate("cast");
            res.render('movies/movie-details', { movie });
        } catch (error) {
            console.log(error);
        }
    });

    router.post('/:id/delete', async (req, res, next) => {
        const movieID = req.params.id;
    
        try {
            await Movie.findByIdAndRemove(movieID);
            res.redirect('/movies');
        } catch (error) {
            console.log(error);
        }
    });
    router.get('/:id/edit', async (req, res, next) => {
        const movieID = req.params.id;
    
        try {
            const [movie, celebrities] = await Promise.all([
                Movie.findById(movieID),
                Celebrity.find()
            ]);
            res.render('movies/edit-movie', { movie, celebrities });
        } catch (error) {
            console.log(error);
        }
    });

router.post('/:id/edit', async (req, res, next) => {
    try {
       const movieID = req.params.id;
       const { title, genre, plot, cast } = req.body;
 
       await Movie.findByIdAndUpdate(movieID, { title, genre, plot, cast }, { new: true });
 
       res.redirect(`/movies/${movieID}`);
    } catch (error) {
       console.log(error);
    }
 });




module.exports = router;
