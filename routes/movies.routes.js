const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model');

router.get('/create', (req, res) => {

    Celebrity
        .find()
        .select('name id')
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const movie = { title, genre, plot, cast }
    
    if (title.length === 0 || genre.length === 0 || plot.length === 0) {
        Celebrity
            .find()
            .select('name id')
            .then(celebrities => res.render('movies/new-movie', { movie, celebrities, errorMsg: 'All fields must be completed' }))
            .catch(err => console.log(err))
        return;
    }

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {
    Movie
        .find()
        .select('title')
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast') 
        .then(movie => res.render('movies/movie-details', { movie }))
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndRemove(id)
        .then(res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params

    const movie = Movie.findById(id).populate('cast') 
    const celebrities = Celebrity.find()

    Promise.all([movie, celebrities]).then(data => {
        const [ movie, celebrities ] = data

        celebrities.forEach(celebrity => {
            for (let i = 0; i < movie.cast.length; i++) {
                if (movie.cast[i].id === celebrity.id) {
                    celebrity.isSelected = true;
                }
            }
        });
        res.render('movies/edit-movie', { movie, celebrities })
    })
    .catch(err => console.log(err))    
})

router.post('/:id', (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    const movie = { id, title, genre, plot, cast }

    if (title.length === 0 || genre.length === 0 || plot.length === 0) {
        Celebrity
            .find()
            .then(celebrities => {
                res.render('movies/edit-movie', { movie, celebrities, errorMsg: 'All fields must be completed' })
            })
            .catch(err => console.log(err)) 
        return; 
    }

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(res.redirect(`/movies/${movie.id}`))
        .catch(err => console.log(err)) 
})



module.exports = router;
