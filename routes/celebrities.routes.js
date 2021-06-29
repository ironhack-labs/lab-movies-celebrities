const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get('/celebrities', async (req, res) => {
    const allTheCelebrities = await Celebrity.find();
    res.render('celebrities/celebrities', { allTheCelebrities });
});

router.get("/celebrities/create", (req, res) => {

    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', async (req, res) => {
    const { name, ocupation, catchPhrase } = req.body;

    await Celebrity.create(
        { name, ocupation, catchPhrase }
    );

    res.redirect("/celebrities");

});

router.get("/celebrities/:id/edit", async (req, res) => {

    res.render("celebrities/edit-celebrity");
});

router.post("/celebrities/:id/delete", async (req, res) => {
    await Celebrity.findByIdAndDelete(req.params.id);
    res.redirect("/celebrities");
});



module.exports = router;