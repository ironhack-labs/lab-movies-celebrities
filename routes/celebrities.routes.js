const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// GET "/celebrities/create" => ruta para renderizar formulario
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
})


// POST "/celebrities/create" => ruta para crear celebrity
router.post("/create", async (req, res, next) => {
try {
    await Celebrity.create(req.body)
    console.log(req.body);
    res.redirect("/celebrities")


} catch (error) {
    res.redirect("/create")
    
}

})





module.exports = router;