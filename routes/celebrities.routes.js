// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

// Importar Router() de express para crear las rutas
const router = require("express").Router();

// Importa el Schema/modelo que usará como modelo de las celebridades y lo guarda en la variable Celebrity
const Celebrity = require("../models/Celebrity.model")

// all your routes here

// Ruta GET para mostrar la lista de celebridades (la ruta es /celebrities)
router.get("/celebrities", (req, res, next) => {
    // Busca las celebridades guardadas en el DB (Mongo Compass) 
    Celebrity.find()
        .then((celebridades) => {
            // Muestra el HBS de celebrities con la info encontrada en el DB (se guarda en la variable celebridades)
            res.render("celebrities/celebrities", { celebridades }) // <= ponemos la variable celebridades como objeto ya que viene como array
        })
        .catch(console.log)
})


// Ruta GET para mostrar el formulario de crear/añadir celebridades
router.get("/celebrities/create", (req, res, next) => {
    // Envia el HBS de new celebrity
    res.render("celebrities/new-celebrity")
})


// Ruta POST para obtener la info enviada del formulario por parte del usuario
router.post("/celebrities/create", (req, res, next) => {
    
    // La info se guarda en req.body con la sig estructura que debe coincidir con el Schema creado para el modelo de Celebridades (Celebrity)
    // Esto se define el formulario creado en el HBS de new-celebrity usando la opcion "name"

    //req.body {
    // name, occupation, catchPhase
    //}

    // Crear un nuevo registro en el DB de una celebridad con la info almacenada en el body usando el Schema Celebrity
    Celebrity.create(req.body)
        .then(() => {
            // despues de crear la celebridad, redirecciona a la pagina de lista de las celebridades
            res.redirect("/celebrities")
        })
        .catch(() => {
            // en caso de algun error, reenvía el formulario de crear celebridad
            res.render("celebrities/new-celebrity")
        })
})

// Exporta la variable router que es la que contiene las rutas
module.exports = router;