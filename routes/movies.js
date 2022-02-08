const router = require("express").Router();
const Movies = require("../models/Movies.model")
const Celebrities = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
    Movies.find()
        .then(movies => {
            res.render("movies/movies-list", { movie: movies });
        })
        .catch();
});

router.get("/new-movie", (req, res, next) => {
    Celebrities.find()
        .then(celebritiesFromDB => {
            res.render("movies/new-movie", { celebrities: celebritiesFromDB });
        })
        .catch()
});

router.post('/new-movie', (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };
    Movies.create(newMovie)
        .then(movie => {
            res.redirect("/movies");
        })
        .catch(() => {
            res.render("movies/new-movie")
        })
})

router.get("/:movieId", (req, res, next) => {
    Movies.findById(req.params.movieId)
    // .populate(Celebrities)
        .then(movie => {
            res.render("movies/movie-details", {movie: movie});
        })
        .catch();
});
router.post("/:movieId/delete", (req, res, next) => {
    Movies.findByIdAndDelete(req.params.movieId)
        .then(() => {
            res.redirect(`/movies`)
        })
        .catch(err => {
            console.log("Error deleting movie...", err);
        });
});

router.get("/:bookId/edit", (req, res, next) => {
    Book.findById(req.params.bookId)
        .then((bookDetails) => {
            res.render("books/book-edit", bookDetails);
        })
        .catch(err => {
            console.log("Error getting book details from DB...", err);
        });
});

router.post("/:bookId/edit", (req, res, next) => {

    const bookId = req.params.bookId

    const newDetails = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        description: req.body.description,

    }
})

    module.exports = router;