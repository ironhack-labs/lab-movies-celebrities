// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
//const app = require("app");
const Celebrity = require("../models/Celebrity.model");

//const { name, ocupation, catchPhrase } = req.body

// all your routes here
//muestra el formulario
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})

//esta ruta recibe la info del formulario 
router.post("/celebrities/create", (req, res) => {
    const { name, ocupation, catchPhrase } = req.body 
    Celebrity.create({
        name,
        ocupation,
        catchPhrase
    })
        .then((newCelebrity) => {
            console.log(newCelebrity)
            res.render("celebrities/celebrities")
        })
        .catch((e) => {console.log(e)})
})

router.get("/celebrities", (req, res) => {

   Celebrity.find()
    .then((list) => {
        const lista = list
        console.log(list)
        res.render("celebrities/celebrities", {celebrities: lista})
    }) 
    .catch((e) => {console.log(e)
    })
})

module.exports = router;
