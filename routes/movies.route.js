const router = require("express").Router();
const Movie = require("../models/Movie.model");

//const router = require("express").Router();

// all your routes here
router.get("/create", (req, res) => {
    res.render('new-movie')
})


router.post("/create", (req, res) => {
    const { title, genre, plot } = req.body;
    console.log(title, genre, plot);
    Movie.create({ title, genre, plot})
        .then(() => {
            //res.redirect('/');
            res.redirect("create") //redireciona pra rota, nao arquivo ... colocar no redirect a rota completa
        })
        .catch(err => {
            console.error(err);
        });
});


module.exports = router;