const express = require("express");
const router = express.Router();

const Celebrity = require(`../models/Celebrity.model`);
const Movie = require(`../models/Movie.model`);


/* GET home page */
router.get(`/movies/new`, (req, res, next) => {
    Celebrity.find()
    .then(celebsFound => {
        res.render(`movies/new-movie`, { celebsFound });
    })
    .catch(error => {
        console.log(`error getting celebs onto new movie form due to ${error}`);
    });
});

router.post(`/movies/create`, (req,res,next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
    .then(savedMovie => {
        res.redirect(`/movies`);
    })
    .catch(error => {
        console.log(`error displaying movies due to ${error}`);
    });
});

router.get(`/movies`, (req,res,next) => {
    Movie.find()
    .then(foundMovies => {
        res.render(`movies/movies`, { foundMovies });
    })
    .catch(error => {
        console.log(`error getting movie due to ${error}`);
    });
});

router.get(`/movies/:id`, (req,res,next) => {
    Movie.findById(req.params.id)
    .populate(`cast`)
    .then(foundMovie => {
        // console.log(foundMovie);
        res.render(`movies/movie-details`, { foundMovie });
    })
    .catch(error => {
        console.log(`error showing movie details due to ${error}`);
    });
});

router.post(`/movies/:id/delete`, (req,res,next) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect(`/movies`);
    })
    .catch(error => {
        console.log(`error deleting movies due to: ${error}`);
    });
});

router.get(`/movies/:id/edit`, (req,res,next) => {
    Movie.findById(req.params.id)
    .populate(`cast`)
    .then(foundMovie => {
        // console.log(`Found movie: ${foundMovie}`)
        Celebrity.find()
        .then(allCelebsFromDB => {
            // console.log(allCelebsFromDB)
            allCelebsFromDB.forEach(eachCeleb => {
                foundMovie.cast.forEach(movieCast => {
                    if(eachCeleb._id.equals(movieCast._id)){
                        eachCeleb.isInCast = true;
                    }
                })
            })




            // console.log(`found movie:`, foundMovie.cast[0]);
            res.render(`movies/edit-movie`, { foundMovie, allCelebsFromDB });
        })
    })
    .catch(error => {
        console.log(`error getting movies from DB due to ${error}`);
    });
});

router.post(`/movies/:id`, (req,res,next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast }, { new: true })
    .then(updatedMovie => {
        res.redirect(`/movies`);
    })
    .catch(error => {
        console.log(`error updating movies due to ${error}`);
    });


});

module.exports = router;
