const router = require("express").Router()
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

router.get('/', (req, res) => {
    Movie
        .find()
        .populate('cast')
        .then(all => res.render("films/movie", { all }))
        .catch(err => console.log("ERROR: ", err))

})

router.get('/create', (req, res) => {
    Celebrity
        .find()
        .then(all => res.render('films/new-movie', { all }))
        .catch(err => console.log("ERROR: ", err))
})

//handler
router.post('/create', (req, res) => {
    // res.render('films/movie')
    const { title, plot, genre, cast } = req.body
    console.log(title, plot, genre, cast)
    Movie
        .create({ title, plot, genre, cast })
        .then(res.redirect('/movies'))
        .catch(err => console.log("ERROR: ", err))

})

//ver detalles
router.get('/:id', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render("films/movie-details", movie))
        .catch(err => console.log("ERROR: ", err))

    // res.send("YAY :3")
})

//editar peliculas
router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    //console.log(id)
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render("films/edit-movie", movie))
        .catch(err => console.log("ERROR: ", err))
})
//handler
router.post('/:id/edit', (req, res) => {
    const { title, plot, genre, cast } = req.body
    const { id } = req.params
    console.log(id)
    Movie
        .findByIdAndUpdate(id, { title, plot, genre, cast })
        .populate('cast')
        .then(res.redirect(`/movies/${id}`))
        .catch(err => console.log("ERROR: ", err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    console.log(id)
    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

module.exports = router