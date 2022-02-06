const { get } = require("express/lib/response");

const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

//create celeb
router.get("/create", (req, res)=>{
    res.render("celebrities/new-celebrity")
})

router.post("/create", (req, res)=>{
   const {name, occupation, catchPhrase} = req.body

   Celebrity
    .create({name, occupation, catchPhrase})
    .then(() => res.redirect("/celebrities"))
    .catch(()=> res.render("celebrities/new-celebrity"))
})

//show the celebs
router.get("/", (req,res)=>{
    Celebrity
     .find()
     .then(celebrities => res.render("celebrities/celebrities", {celebrities}))
     .catch(err => console.log(err))
})

//show celebrity details
router.get("/:id", (req, res) => {
    const celebrityid = req.params

    Celebrity
        .findById(celebrityid.id)
        .then(celebrity => res.render('celebrities/celebrity-details', celebrity))
        .catch(err => console.log(err))
})

//edit celebrity
router.get("/:id/edit", (req,res) =>{
    const celebId = req.params

  Celebrity
    .findById(celebId.id)
    .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
    .catch(err => console.log(err))
})

router.post("/:id/edit", (req, res)=>{
    const celebId = req.params
    const {name, occupation, catchPhrase} = req.body

    Celebrity
    .findByIdAndUpdate(celebId.id, {name, occupation, catchPhrase})
    .then(uptadedCeleb => res.redirect(`/celebrities/${uptadedCeleb.id}`))
})

//delete celeb
router.post("/:id/delete", (req, res) => {
    const celebid = req.params

    Celebrity
        .findByIdAndDelete(celebid.id)
        .then(() => res.redirect("/celebrities"))
        .catch(err => console.log(err))
})


module.exports = router;