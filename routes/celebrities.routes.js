const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model')

router.get("/list",(req,res,next)=>{
//    const ei = ['hola','adios']
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
  
})
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebritie")
})
router.post("/create",(req,res,next)=>{
    const{name, occupation, catchphrase} = req.body
   
    Celebrity
        .create({ name, occupation, catchphrase})
        .then(() => res.redirect("/celebrities/list"))
        .catch(err => console.log(err))

    
})
module.exports = router;
