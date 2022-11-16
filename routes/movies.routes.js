const router = require("express").Router();
const Movies = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

// create movie
router.get("/movies/create", (req, res, next) => {  //create
    Celebrity.find()
    .then((celebrities) => {
        res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
        console.log("Error while getting the Movies from the DB: ", error);
    });
});

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movies.create({
        title,
        genre,
        plot,
        cast
    })
    .then(createdMovie => {
        res.redirect("/movies")
    })
    .catch(err => {
        res.render("movies/new-movie")
    })
})

// Get movies
router.get("/movies", (req, res) => {
    Movies.find()
    .then(movies => {
        res.render("movies/movies", { movies })
    })
    .catch(err => {
        console.log(err)
    })
})

// Get movie details
router.get("/movies/:id", (req, res) => {
    const id = req.params.id

    Movies.findById(id)
    .populate("cast")
    .then(movie => {
        res.render("movies/movie-details", { movie })
    })
    .catch(err => {
        console.log(err)
    })
})

// Delete movie
router.post("/movies/:id/delete", (req, res, next) => {
    const id = req.params.id

    Movies.findByIdAndRemove(id)
    .then(deletedMovie => {
        res.redirect("/movies")
    })
    .catch(err => {
        next(err)
    })
})

// Edit movie
router.get("/movies/:id/edit", async (req, res, next) => {
    const id = req.params.id

    try {
        const movie = await Movies.findById(id).populate("cast")
        const celebrities = await Celebrity.find()
        const celebritiesNotInCast = filterCelebritiesNotInCast(movie, celebrities)

        res.render("movies/edit-movie", { movie, celebritiesNotInCast })
    } catch (error) {
        console.log(error)
    }
})

router.post("/movies/:id/edit", (req, res, next) => {
    const id = req.params.id
    const { title, genre, plot, cast } = req.body

    const movie = {
        title,
        genre,
        plot,
        cast
    }

    Movies.findByIdAndUpdate(id, movie)
    .then(createdMovie => {
        res.redirect(`/movies/${id}`)
    })
    .catch(err => {
        next(err)
    })
})

function filterCelebritiesNotInCast(movie, celebrities) {
    return celebrities.filter(celebrity => {
        movie.cast.forEach(movieCelebrity => {
            if (movieCelebrity.name === celebrity.name) {
                return false
            }
        })
        return true
    })
}
// router.get('/movies/create', (req, res) => {
//     res.render('movies/new-movie')
// });


// router.post("/movies/create", (req, res, next) => {
//     const { title, genre, plot, posts } = req.body;

//     Movies.create({title, genre, plot, posts})
//         .then(() => res.redirect("/movies"))
//         .catch((error) => res.render("movies/new-movie"));
// });



module.exports = router;