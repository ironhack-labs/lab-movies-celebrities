// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
// const router = require("express").Router();
// importamos express
const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model")


// all your routes here

//Vista para crear a la celebridad
//localhost:3000/celebrities/create
router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity")
});

//Recibir los datos de la celebridad
//localhost:3000/celebrities/create
router.post("/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;

    if (name === '' || occupation === '' || catchPhrase === '') {
        res.render('celebrities/new-celebrity', {
          errorMessage: 'Please enter all the fields, name, occupation and catch phrase to login.'
        });
        return;
      }else {
        Celebrity.create(req.body)
          .then(newCelebrity => {
            console.log(newCelebrity)
            res.redirect("/celebrities");
          })
        
      }
});

//Vista para mostrar la lista de celebridades
//localhost:3000/celebrities
router.get("/", (req, res) => {
  Celebrity.find()
      .then((celebrities) => {
        console.log(celebrities);
        res.render("celebrities/celebrities", {celebrities: celebrities})
      })
      .catch(err => {console.log(err)})
})



module.exports = router;