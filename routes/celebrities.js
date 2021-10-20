const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")


router.get("/celebrities/create", (req, res, next)=>{
    res.render("celebrities/new-celebrity")
})


router.post("/celebrities/create", (req, res, next)=>{

    const {name, occupation, catchPhrase } = req.body;

    Celebrity
    .create({name, occupation, catchPhrase})
    .then(()=>{
        res.render("celebrities")
    })
    .catch( (error) => {
        console.log("Error adding new book to DB", error);
        next(error);
    });

})






module.exports = router