const express = require("express");
const router = express.Router();

const Celebrity = require('../models/Celebrity.model.js')

router.get("/celebrity/new", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});
router.post('/celebrities/create',(req,res)=>{
    Celebrity.create(req.body)
    .then((result)=>{
   // console.log(result)
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
    //console.log(result)
    const data ={celebrity: result}
    res.render('celebrities/celebrities', data)
    })
    .catch((error)=>{
    console.log(error)
    })
        
})

router.get('/celebrities/:_id', (req,res)=>{
    Celebrity.findById(req.params)
    .then((result)=>{
    res.render('celebrities/celebrity-details', {celebrity: result})
    })
    .catch((error)=>{
    console.log(error)
    })
});

router.post('/celebrities/:_id/delete',(req,res)=>{
    Celebrity.findByIdAndDelete(req.params)
    .then((result)=>{
    res.redirect('/celebrities/celebrities')
    })
    .catch((error)=>{
    console.log(error)
    })
})

router.get('/celebrities/:_id/edit',(req,res)=>{
    Celebrity.findById(req.params._id)
    .then((result)=>{
    console.log(result)
    res.render('celebrities/edit-celebrity', result)
    })
    .catch((error)=>{
    console.log(error)
    })
})

router.post('/celebrities/:_id/edit', (req,res)=>{
    Celebrity.findByIdAndUpdate(req.params._id, req.body)
    .then((result)=>{
    console.log(result)
    res.redirect('/celebrities/celebrities')
    })
    .catch((error)=>{
    console.log(error)
    })
    
})

module.exports = router;

