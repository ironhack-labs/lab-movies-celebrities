const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get('/celebrities',(req,res,next)=>{
    Celebrity.find()
    .then((celebrities)=>{
        res.render('celebrities/celebrities',{celebrities});
    })
    .catch(error=>{
        console.log("Error",error)
        next()
    })
})

router.get('/celebrities/create',(req,res,next)=>{
    res.render('celebrities/new-celebrity')
})

router.post("/celebrities/create",(req,res,next)=>{
    Celebrity.create(req.body)
    .then(celebrities => {
        console.log("que es el dog",celebrities)
        res.render("success",celebrities)
    })
    .catch(error=> {
        console.log("error",error)
        next()
    })
})

module.exports = router;