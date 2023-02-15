const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create", (req, res, next) => {
    let data = req.body;
    Celebrity.create(data)
    .then((data)=>{
        res.render("celebrities/celebrities")
    })
    .catch((err)=>{
        res.render("celebrities/new-celebrity")
    })
});

router.get("/celebrities", (req,res,next)=>{
    Celebrity.find()
    .then((data)=>{
        res.render("celebrities/celebrities", {celebs: data})
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get("/celebrity/:id/edit", (req, res, next)=>{
    let id = req.params.id;
    Celebrity.findById(id)
    .then((data)=>{
        res.render("celebrities/edit-celebrity", {celeb:data})
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post("/celebrity/:id/edit", (req, res, next)=>{
    let obj = req.body
    let id = req.params.id;
    Celebrity.findOneAndUpdate({_id: id}, obj, {new: true})
    .then((data)=>{
        res.redirect("/celebrities")
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post("/celebrity/:id/delete", (req,res,next)=>{
    let id = req.params.id;
    Celebrity.findByIdAndDelete(id)
    .then((data)=>{
        res.redirect("/celebrities")
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get("/celebrity/:id", (req,res,next)=>{
    let id = req.params.id;
    Celebrity.findById(id)
    .then((data)=>{
        res.render("celebrities/celebrity-details", {celeb: data})
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router;