const router = require("express").Router();

// /1. Crear la vista del formulario para crear una celebrity

router.get("/celebrities/new-celebrity", (req, res) => {
  res.render("celebrities/new-celebrity");
});
// /4. Crear el endpoint para crear libros.

router.post("/celebrities/new-celebrity", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  //5. Realizar las operaciones en la BBDD o la lógica de negocio
  Celebrity.create({ name, occupation, catchPhrase })
    //6. Decidir que vista vamos a renderizar
    .then((celebrity) => res.render("celebrities", celebrity))
    .catch((err) => console.log("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()

    .then((allTheCelebrities) =>
      res.render("celebrities", { allTheCelebrities })
    )
    // ESTE EN ROJO DEBERIA SER EL ARRAY DE CELEBRITIES

    .catch((err) => console.log(err));
});

module.exports = router;
