const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");



router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(celebrityDetails)
    .then((celebrityDetails)=>{
       res.redirect("/celebrities")
    })
    .catch((err)=>{ 
      //  res.render("celebrities/new-celebrity")
    })
})



router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((celebArr) => {
        res.render("celebrities/celebrities", {celebArr})
    })
    .catch()
})







router.post("/celebrities/:id/delete", (req, res, next) => {
    Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
        res.redirect("/celebrities")
    })
    .catch()
})






router.get("/celebrities/:id/edit", (req, res, next) => {
    Celebrity.findById(req.params.id) 
    .then((celebrityDetails) => {
        res.render("celebrities/edit-celebrity", {celebrityDetails})
    })
    .catch()
})

router.post("/celebrities/:id", (req, res, next) => {
    const updatedCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }
    Celebrity.findByIdAndUpdate(req.params.id, updatedCelebrity)
    .then((result) => {
     res.redirect("/celebrities")
       
    })
    .catch()
})

module.exports = router;