const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get('/user/celebrities',(req,res,next)=>{
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

router.get('/celebrity-edit/:id',(req,res,next)=>{
    const {id} = req.params;
    Celebrity.findById(id)
    .then(celebrity => {
        res.render('celebrities/edit-celebrity',celebrity);
    })
})

router.post('/celebrity-edit/:id',(req,res,next)=>{
    const {id} = req.params;
    const {name,occupation,catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(id,{name,occupation,catchPhrase},{new:true})
    .then(celebrityUpdated=>{
        console.log('nueva info: ',celebrityUpdated);
        res.redirect('/user/celebrities')
    })
    .catch(error=> {
        console.log("error",error)
        next()
    })
})

module.exports = router;