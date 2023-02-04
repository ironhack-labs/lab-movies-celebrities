const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');
// celebrity routes

//--------------------------------  CREATE --> C --------------------------------
//--------------------------------  CREATE --> C --------------------------------
//--------------------------------  CREATE --> C --------------------------------

router.get('/create', async (req, res, next) => {
    try {
        res.render('celebrities/new-celebrity')
    } catch (error) {
        next(error)
    }
})

router.post('/create', async (req, res, next) => {

    try {
        const newCelebrity = req.body;
        const inseredCelebrity = await Celebrity.create(newCelebrity)

        // console.log('New Clebrity Created: ', inseredCelebrity)

        res.redirect('/celebrities')

    } catch (error) {
        res.render('celebrities/new-celebrity')
    }

})

//--------------------------------  READ --> R --------------------------------
//--------------------------------  READ --> R --------------------------------
//--------------------------------  READ --> R --------------------------------

router.get('/', async (req, res, next) => {

    try {
        const allCelebrities = await Celebrity.find();

        res.render('celebrities/celebrities', { celebrities: allCelebrities })
    } catch (error) {
        next(error)
    }

})


//--------------------------------  Check Single Movie --------------------------------
router.get('/:celebId', async (req, res, next) => {
    try {
        const { celebId } = req.params;
        const movieDetails = await Celebrity.findById(celebId);

        res.render('celebrities/celebrities-details', movieDetails)

    } catch (error) {
        next(error)
    }
})



//--------------------------------  UPDATE --> U --------------------------------
//--------------------------------  UPDATE --> U --------------------------------
//--------------------------------  UPDATE --> U --------------------------------
router.get('/:celebId/edit', async (req, res, next) => {

    try {
        const { celebId } = req.params;
        const { _id, name, occupation, catchPhrase, participateMovies } = await Celebrity.findById(celebId);

        // get all the movies 
        const allMovies = await Movie.find()

        // Update movies done by actor
        const updateMovie = allMovies.map((movie) => {
            if (participateMovies.includes(movie._id)) {
                movie.done = true;
                return movie
            } else {
                movie.done = false;
                return movie
            }
        })

        res.render('celebrities/edit-celebrities',
            {
                _id,
                name,
                occupation,
                catchPhrase,
                updateMovie
            }
        )

    } catch (error) {
        next(error)
    }


})

router.post("/:celebId/edit", async (req, res) => {
    try {
        const { celebId } = req.params

        const { name, occupation, catchPhrase, participateMovies } = req.body

        await Celebrity.findByIdAndUpdate(celebId,
            {
                name,
                occupation,
                catchPhrase,
                participateMovies : participateMovies
            })

        res.redirect('/celebrities')

    } catch (error) {
        next(error)
    }
})




//--------------------------------  DELETE --> D --------------------------------
//--------------------------------  DELETE --> D --------------------------------
//--------------------------------  DELETE --> D --------------------------------
router.post('/:celebId', async (req, res, next) => {
    try {
        const { celebId } = req.params;
        await Celebrity.findByIdAndDelete(celebId);
        res.redirect('/celebrities');
    } catch (error) {
        next(error)
    }
})



module.exports = router;