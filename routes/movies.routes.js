const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// movies routes

//--------------------------------  CREATE --> C --------------------------------
//--------------------------------  CREATE --> C --------------------------------
//--------------------------------  CREATE --> C --------------------------------


router.get('/create', async (req, res, next) => {
    try {
        const celebritiesArray = await Celebrity.find()

        res.render('movies/new-movie', { allCelebrities: celebritiesArray })
    } catch (error) {
        next(error)
    }
})

router.post('/create', async (req, res, next) => {
    try {
        const newMovie = req.body;

        console.log(newMovie);

        const insertedMovie = await Movie.create(newMovie);

        // console.log('New Movie Created: ', insertedMovie);

        res.redirect('/movies');

    } catch (error) {
        next(error)
    }
})


//--------------------------------  READ --> R --------------------------------
//--------------------------------  READ --> R --------------------------------
//--------------------------------  READ --> R --------------------------------

router.get('/', async (req, res, next) => {

    try {
        const allMovies = await Movie.find();
        res.render('movies/movies', { movies: allMovies })

    } catch (error) {
        next(error)
    }

})

router.get('/:movieId', async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const foundMovie = await Movie.findById(movieId).populate('cast');

        res.render('movies/movie-details', foundMovie)

    } catch (error) {
        next(error)
    }

})


//--------------------------------  UPDATE --> U --------------------------------
//--------------------------------  UPDATE --> U --------------------------------
//--------------------------------  UPDATE --> U --------------------------------
router.get('/:movieId/edit', async (req, res, next) => {
    try {
        const { movieId } = req.params
        const { _id, title, genre, plot, cast } = await Movie.findById(movieId)
        const allCelebrities = await Celebrity.find()

        // CHECK IF THE CELEBRITY IS IN CAST 
        const updateCeleb = allCelebrities.map((celeb) => {
            if (cast.includes(celeb._id)) {
                // let updatedCeleb = { celeb, isInMovie: 'true' } // add a propriety to the object 
                celeb.isInMovie = true;
                return celeb
            } else {
                // let updatedCeleb = celeb.isInMovie = true;
                // let updatedCeleb = { celeb, isInMovie: 'false' }
                celeb.isInMovie = false
                return celeb
            }
        })


        res.render('movies/edit-movie',
            {
                _id,
                title,
                genre,
                cast,
                plot,
                updateCeleb
            })

    } catch (error) {
        next(error)
    }
})

router.post('/:movieId/edit', async (req, res, next) => {
    try {

        const { movieId } = req.params;

        const { title, genre, plot, cast } = req.body;


        await Movie.findByIdAndUpdate(movieId,
            {
                title,
                cast: cast,
                genre,
                plot
            }
        )

        res.redirect('/movies')

    } catch (error) {
        next(error)
    }
})


//--------------------------------  DELETE --> D --------------------------------
//--------------------------------  DELETE --> D --------------------------------
//--------------------------------  DELETE --> D --------------------------------
router.post('/:movieId/delete', async (req, res, next) => {
    try {
        const { movieId } = req.params;
        await Movie.findByIdAndDelete(movieId);
        res.redirect('/movies')
    } catch (error) {
        next(error)
    }
})


module.exports = router;