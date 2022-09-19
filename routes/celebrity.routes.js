const Celebrity = require("../models/Celebrity.model");


// all your routes here
router.get("/celebrities", (req, res) => {
    Celebrity.find()
        .then((celebridades) => {
            res.render("celebrities/celebrities", { celebridades: celebridades })
        })
        .catch(console.log)
})

router.get("/celebrities/create", (req,res)=>{
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req,res)=>{
    Celebrity.create(req.body)
    .then(newcelebrity =>{
        res.redirect("/celebrities")
    })
})



module.exports = router;