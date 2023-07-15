//GET
const Celebrity = require('../models/Celebrity.model')

const router = require('express').Router()


router.get('/',(req,res)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render('../views/celebrities/celebrities',{allCelebrities})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/create',(req,res)=>{
    res.render('../views/celebrities/new-celebrity')
})



// //READ for 1 resource
// router.get('/:id',(req,res)=>{
//     console.log(req.params)
//     Book.findById(req.params.id)
//     .then((oneBook)=>{
//         res.render('book-info',oneBook)
//     })
// })

router.post('/create',(req,res)=>{
    console.log(req.body)
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then((newCelebrity)=>{
        console.log(newCelebrity)
        res.redirect(`/`)
    })
    .catch((err)=>{
        console.log(err)
    })
})
module.exports = router