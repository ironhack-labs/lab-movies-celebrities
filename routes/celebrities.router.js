// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((allTheCelebrities) => {
      console.log(allTheCelebrities);
      res.render("celebrities/celebrities", { allTheCelebrities });
    })
    .catch((err) => console.log(err));
});

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  //5. Realizar las operaciones en la BBDD o la lógica de negocio
  Celebrity.create({ name, occupation, catchPhrase })
    //6. Decidir que vista vamos a renderizar
    .then((celebrity) => res.redirect("/celebrities"))
    .catch((err) => {
      res.render("celebrities/new-celebrity");
      console.log(err);
    });
});

module.exports = router;
