const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model');

router.get('/', (req, res) => {

    Movie.find()
        .select({ title: 1 })
        .then(data => res.render('movies/movies', { data }))
        .catch(err => console.log("error loading the movies ", err))

});

router.get('/create', (req, res) => {
    Celebrity.find()
        .select({ name: 1 })
        .then(data => {
            res.render('movies/new-movie', { data })
        })
        .catch(err => console.log("Error loading the the artists names ", err));
});

router.post('/create', (req, res) => {

    Movie
        .create(req.body)
        .then(data => {
            return data._id;
        })
        .then(movieID => {
            //We create a filter to get all the cast members
            if (req.body.cast.length > 0) {
                const filterParam = {
                    $or: []
                }
                req.body.cast.forEach(castID => {
                    filterParam.$or.push({ _id: castID });
                });

                //we update the cast members with the id of the movie
                return Celebrity.updateMany(filterParam, { $push: { movies: movieID } })
            }

            //OLD WAY a lot of calls to mongo
            //
            // req.body.cast.forEach(castID => {
            //     Celebrity.findByIdAndUpdate(castID, { $push: { movies: movieID } })
            //         .then(data => console.log("Sucess", data))
            //         .catch(err => (console.log("Error adding movies to cast", err)))
            // });

        })
        .then(res.redirect('/movies'))
        .catch(err => console.log("Error adding movie to the DB ", err));

});

router.post('/:id/delete', (req, res) => {
    //delete the movie from the cast's movies list
    const movieID = req.params.id;

    const removeCastMovie = Celebrity.updateMany({ movies: movieID }, { $pull: { movies: movieID } });
    const deleteMovie = Movie.findOneAndDelete(req.params.id);

    Promise.all([removeCastMovie, deleteMovie])
        .then(res.redirect('/movies'))
        .catch(err => console.log("error deleting the movie", err));
});

router.get('/:id', (req, res) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then(data => res.render('movies/movie-details', data))
        .catch(err => console.log("Error loading the movie ", err));
});

router.get('/:id/edit', (req, res) => {

    const celebPromise = Celebrity.find().select({ name: 1 });
    const moviePromise = Movie.findById(req.params.id);

    Promise.all([celebPromise, moviePromise])
        .then(data => {

            const obj = {
                celebs: data[0],
                movie: data[1]
            };
            //if there were a lot more of celebs i would use a hash function to reduce loading times

            obj.celebs.forEach((celeb, i) => {
                //if the cast includes the celeb set the inMovie param to true
                const celebInMovie = obj.movie.cast.some(e => e.equals(celeb._id));
                obj.celebs[i].inMovie = celebInMovie;
            });

            res.render('movies/edit-movie', obj)

        })
        .catch(err => console.log(err));
});

router.post('/:id/edit', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body)
        .then(res.redirect(`/movies/${req.params.id}`))
        .catch(err => console.log("error updating the DB ", err));
});



module.exports = router;
