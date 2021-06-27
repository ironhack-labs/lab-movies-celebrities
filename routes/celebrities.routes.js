const Celebrities = require("../models/Celebrity.model");
const { route } = require("./movies.routes");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
//SOLO RUTAS DE FORMA localhost3000:/celebrities/ algo////

// all your routes here
router.get("/", (req, res, next) => {
    res.render("celebrities/celebritie");
    // res.send("hello succes")
});

router.get("/add-celebrities", (req, res) => {
    res.render("celebrities/new-celebrities")
    //res.redirect("/") para volver a inicio
})



// New book form: render
//router.get('/libros/crear', (req, res) => res.render('books/create-book'))

//para introducir las nuevas celebrities en la base de datos
router.post('/add-celebrities', (req, res) => {

    const { name, ocuppation, catchPrase } = req.body

    Celebrities
        .create({ name, ocuppation, catchPrase })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})


/////para ver las celebrities
router.get("/celebrities-list", (req, res) => {///si recibo en la url /celebrities-list

    Celebrities
        .find()
        .then(celebrities => res.render("celebrities/celebrities-list", { celebrities }))
        .catch(err => console.log(err))

    //entonces sacame celebrities-list.hbs que esta en la carpeta celebrities
    //res.redirect("/") para volver a inicio
})



// route.get('/create', ... en vez de /celebrities/create
// route.post('/create', ...)
// res.send(mensaje) -> manda un mensaje a la pantalla
// res.render('ún hbs - ruta relativa al directorio views', (req, ....)) -> renderiza una pagina
// res.redirect('´path de una ruta', ...)

module.exports = router;