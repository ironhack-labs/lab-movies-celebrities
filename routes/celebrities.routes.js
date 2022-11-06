const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create',(req,res)=>{
 res.render('celebrities/new-celebrity')
})
router.post('/celebrities/create',async(req,res)=>{
  const celebrity = req.body
  const {name,occupation,catchPhrase} = celebrity
  !name || !occupation || !catchPhrase ? res.render('celebrities/new-celebrity') : null
  const foundedCelebrity = Celebrity.findOne(celebrity)
  foundedCelebrity ? res.render('celebrities/new-celebrity') : null
  try{
   await Celebrity.create(celebrity)
   //const celebrities= Celebrity.find()
   //res.render('celebrities/celebrities',celebrities)
  }catch(error){
    console.log(error)
    res.render('celebrities/new-celebrity')
  }
})

module.exports = router