const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model')


//Mostrar el view para agregar una celebridad
router.get('/celebrities/create',(req,res,next)=>{
    res.render('celebrities/new-celebrity')
})

//Hacer el post del formulario "Crear celebridad" para mandarlo a la DB
router.post('/celebrities/create',(req,res,next)=>{
    const {name,occupation,catchPhrase} = req.body
    Celebrity.create({name,occupation,catchPhrase})
    .then((newCelebrity)=>{
        console.log('New celebrity Has Been Created: ',newCelebrity)
        res.render('/celebrities')
    })
    .catch((err)=>{
        res.render('celebrities/new-celebrity')
    })
})




module.exports = router;