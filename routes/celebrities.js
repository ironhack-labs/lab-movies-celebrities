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
        res.render("celebrities/celebritiesList")
    })
    .catch( (error) => {
        console.log("Error adding new book to DB", error);
        next(error);
    });

})

router.get('/celebrities/list', (req, res, next)=>{

    Celebrity
    .find()
    .then((listOfCelebFromDB)=>{
        res.render("celebrities/celebritiesList", {celebArr: listOfCelebFromDB})
    })
    .catch( (error) => {
        console.log("Error adding to DB", error);
        next(error);
    });


})





module.exports = router