const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


//const router = require("express").Router();

// all your routes here

router.get('/',(req,res) =>{
    res.send("OK")
})

router.get("/create", (req, res) => {
    Celebrity.find()
    .then((allCelebrities)=>{
        //console.log(allClelebrities)
        res.render('new-movie',{allCelebrities})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/create", (req, res) => {
    const { title, genre, plot, cast } = req.body;
    console.log(title, genre, plot, cast);
    Movie.create({ title, genre, plot, cast})
        .then(() => {
            //res.redirect('/');
            res.redirect("create") //redireciona pra rota, nao arquivo ... colocar no redirect a rota completa
        })
        .catch(err => {
            console.error(err);
        });
});


module.exports = router;