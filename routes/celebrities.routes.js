const router = require("express").Router();
const Celebrity = require("../models/celebrity.model")
// all your routes here

router.get("/new-celebrity", (req, res) => {
    res.render("new-celebrity");
}),

router.post("/new-celebrity", (req, res) => {
    const { name, occupation, catchphrase } = req.body;
    //5. Realizar las operaciones en la BBDD o la lógica de negocio
    Celebrity.create({ name, occupation, catchphrase })
    //6. Decidir que vista vamos a renderizar
        .then(celeb => res.render(("celebrities/celebrities"), celeb))
        .catch(err => res.redirect("/new-celebrity", err))
})


router.get("/celebrities", (req, res) => {
    
    Celebrity.find()
        .then(Celebrity => res.render("/celebrities", {Celebrity}))
        .catch(err => console.log(err))
})


module.exports = router;