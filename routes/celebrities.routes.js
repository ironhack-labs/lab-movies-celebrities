// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/celebrities/create",(req,res)=>{
    res.render("../views/celebrities/new-celebrity.hbs")
})

router.post("/celebrities/create",(req,res)=>{
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name,occupation,catchPhrase})
    .then(()=>{
        res.redirect("/celebrities")
    })
    .catch(()=>{
        res.render("../views/celebrities/new-celebrity.hbs")
    })
})

router.get("/celebrities",(req,res)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("../views/celebrities/celebrities.hbs",{allCelebrities})
    })
})

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .populate("movies")
    .then((celebrities) => {
      res.render("celebrities", { celebrities });
    });
});

module.exports = router;
