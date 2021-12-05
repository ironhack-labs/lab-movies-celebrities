// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
// all your routes here

router.get("/", (req, res, next) => {
    Movie.find()
        .then(movies => {
            console.log(movies)
            res.render('movies/movies', { movies });
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });
})

router.get('/create', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities });
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });

});


router.post('/create', (req, res, next) => {
    console.log(req.body)
    const { title, genre, plot, cast, ...rest } = req.body;
    Movie.create({
        title,
        genre,
        plot,
        cast
    }).then(movie => {
        console.log("movie created", movie);
        res.redirect('/movies');
    }).catch(error => {
        console.log("Error", error);
        res.render("error");
    });
});


router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
        .populate('cast')
        .then(movie => {
            console.log("movie", movie)
            res.render('movies/movie-details', movie);
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });

});

router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies');
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });
});


router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
        .then(movie => {
            Celebrity.find().then(celebrities => {
                //console.log(`--- movie ${movie}---- celebrities ${celebrities}`);
                console.log("*******************************")
                const i = {... { movie }, ... { celebrities } };
                console.log(i)
                res.render('movies/edit-movie', i);
            }).catch(error => {
                console.log("Error", error);
                res.render("error");
            })
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });
});


router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(id, {
            title,
            genre,
            plot,
            cast
        }, { new: true })
        .then(movie => {
            console.log("actualizado", movie)
            res.redirect('/movies');
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });
});

module.exports = router;