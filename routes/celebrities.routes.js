const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model')


//Mostrar el view para agregar una celebridad
router.get('/celebrities/create',(req,res,next)=>{
    res.render('celebrities/new-celebrity')
})

//Hacer el post del formulario "Crear celebridad" para mandarlo a la DB
router.post('/celebrities/create',(req,res,next)=>{
    const {name,occupation,catchPhrase} = req.body
    console.log("EL REQ BODY",req.body)
    Celebrity.create({name,occupation,catchPhrase})
    .then((newCelebrity)=>{
        console.log('New celebrity Has Been Created: ',newCelebrity)
        res.redirect('/celebrities')
    })
    .catch((err)=>{
        res.render('celebrities/new-celebrity')
    })
})


//Crear el GEY para /celebrities
router.get('/celebrities',(req,res,next)=>{
    Celebrity.find()
    .then((allCelebritiesFromDB)=>{
        console.log("All Celebrities From DB: ",allCelebritiesFromDB)
        res.render('celebrities/celebrities',{celebrities:allCelebritiesFromDB})
    })
    .catch(err=>console.log("ERROR en Getting ALL Celebrities from DB",err))
})



module.exports = router;