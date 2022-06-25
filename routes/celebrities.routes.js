const router = require("express").Router();

const { route } = require("express/lib/application");

const Celebrities = require('../models/Celebrity.model');


router.get('/create', (req,res,next)=>{
    res.render('celebrities/new-celebrity')
})


router.post('/create',(req,res,next)=>{
    const {...data} = req.body //Cuando son mas de un valor es necesario los tres puntos o definir cada valor para ser mostrado posteriormente!
    console.log('que es data:', data)
    Celebrities.create(data)
    .then(() => {
        res.redirect('/celebrities/celebrities')
    })
    .catch(error => {
        console.log('Ha salido un error al crear los datos: ', error)
        next()
    })
})

router.get('/celebrities', (req,res,next)=>{
    console.log('Estoy en celebrities');
    Celebrities.find()
    .then(allCelebrities =>{
        console.log('Que es celebrities:',{allCelebrities})
        res.render('celebrities/celebrities',{allCelebrities})
    })
    .catch(error => {
        console.log('Ha salido un error al crear los datos: ', error)
        next()
    })
})

module.exports = router;