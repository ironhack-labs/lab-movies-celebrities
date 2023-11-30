const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const { route } = require("./celebrities.routes");

const router = require("express").Router();

router.get('/movies', (req, res) => {
    Movie.find().then(moviesFound => {
        console.log(moviesFound);
        res.render('../views/movies/movies.hbs', { moviesFound });
    })
});

router.get('/movies/create', (req, res) => {
    Celebrity.find().then(celebritiesFound => {
        console.log('Celebrities found: ', celebritiesFound);
        res.render('../views/movies/new-movie.hbs', { celebritiesFound });
    })
    .catch(err => {
        console.log(err);
    })
});

router.post('/movies/create', (req, res) => {
    Movie.create(req.body).then(data => {
        console.log(`The movie ${data.title} has been added :`, data);
        res.redirect('/movies');
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/movies/:id', (req, res) => {
    let params = req.params.id;

    Movie.findById(params).populate('cast').then(movie => {
        console.log('Data retrieved:', movie);
        res.render('../views/movies/movie-details.hbs', { movie });
    })
    .catch(err => {
        console.log(err);
    })
});

router.post('/movies/:id/delete', (req, res) => {
    let { id } = req.params;

    Movie.findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => next(err));
});

router.get('/movies/:id/edit', async (req, res) => {
    let { id } = req.params;

    try {
        const [movieToEdit, celebritiesFound] = await Promise.all([
            Movie.findById(id),
            Celebrity.find()
        ]);
    
        if(!movieToEdit) {
            return console.error('Movies not found')
        } 
    
        res.render('movies/edit-movie', { movieToEdit: movieToEdit, celebritiesFound: celebritiesFound });
    } catch (err) {
        console.error(err);
    }
    // Movie.findById(id)
    //     .then(movieToEdit => {
    //         console.log(movieToEdit);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    // Celebrity.find()
    //     .then(celebritiesFound => {
    //         console.log(celebritiesFound);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
});

router.post('/movies/:id/edit', (req, res) => {
    let { id } = req.params;

    const dataToUpdate = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.findByIdAndUpdate(id, dataToUpdate, { new: true })
        .then(movieUpdated => {
            console.log('Movie updated:', movieUpdated);
            res.redirect('/movies');
        })
        .catch(err => {
            console.error(err);
        })
});

module.exports = router;