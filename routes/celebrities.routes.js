const express = require("express");
const router = express.Router();

const Celebrity = require('../models/Celebrity.model.js')

router.get("/celebrity/new", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});
router.post('/celebrities/create',(req,res)=>{
    Celebrity.create(req.body)
    .then((result)=>{
    console.log(result)
    res.redirect('/celebrities/celebrities')
    })
    .catch((error)=>{
    console.log(error)
    res.render('/celebrities/new-celebrity')
    })
    
})

router.get('/celebrities/celebrities', (req,res)=>{
    Celebrity.find({})
    .then((result)=>{
    console.log(result)
    const data ={celebrity: result}
    res.render('celebrities/celebrities', data)
    })
    .catch((error)=>{
    console.log(error)
    })
        
})

module.exports = router;

