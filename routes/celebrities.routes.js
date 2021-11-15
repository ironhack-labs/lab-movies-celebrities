// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here


router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity")
  })

//4. Crear el endpoint para crear celebrity.

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  //5. Realizar las operaciones en la BBDD o la lógica de negocio
  Celebrity.create({ name, occupation, catchPhrase })
    // //6. Decidir que vista vamos a renderizar
    .then(celebrity => {
      res.render("celebrities/celebrities", celebrity)
      res.redirect("/celebrities/celebrities");
    })
});


//Lista de Celebrities

router.get("/celebrities", (req, res) => {
  Celebrity.find().then((celebrity) => {
    res.render("celebrities/celebrities", { celebrity: celebrity });
  });
});

module.exports = router;