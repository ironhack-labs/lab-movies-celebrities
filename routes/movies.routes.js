const router = require("express").Router();

// Routes:

// Create a movie

router.get('/create', (req, res) => {
    res.render('movies/new-movie')
})



// STEP 1 IT 6 ARRIBA EN EL PASO GET, LO SIGUIENTE ES HACER EL FORM
// DE LAS PELICULAS 



router.post('/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Celebrity
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => {
            res.render('movies/new-movie')
            console.log(err)
        })
})


module.exports = router;