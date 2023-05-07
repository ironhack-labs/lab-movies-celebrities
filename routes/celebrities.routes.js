// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')


//vamos a crear aquí la ruta para la creación de celebridades (form, necesitamos método get -render- y post -handler-)

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

//creamos la ruta para mostrar las celebridades creadas en Database-hay que desplegarlo mcomo objeto) (listing, con GET)

router.get("/celebrities", (req, res, next) => {

    Celebrity
        .find()
        .then(listCelebritiesDB => res.render('celebrities/celebrities.hbs', { listCelebritiesDB }))
        .catch(err => console.log(err))

})

//voy a hacer ruta para borrar celebrities también

router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/celebrities`))
        .catch(err => console.log(err))
});



module.exports = router;