const { Router } = require("express");
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//const router = require("express").Router();

// all your routes here

router.get('/showcelebrities',(req,res)=>{
    
    Celebrity.find()
    .then((allCelebrities)=>{
        console.log(allCelebrities)
        res.render('celebrities',{allCelebriteis})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get("/create", (req, res) => {
    res.render('new-celebrity')
})


router.post("/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    console.log(name, occupation, catchPhrase);
    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => {
            //res.redirect('/');
            res.redirect("create") //redireciona pra rota, nao arquivo ... colocar no redirect a rota completa
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;