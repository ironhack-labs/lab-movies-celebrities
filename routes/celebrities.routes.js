const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities',async(req,res)=>{
try{
  let celebrities = await Celebrity.find()
  res.render('celebrities/celebrities',celebrities)
}catch(error){
  console.log(error)
}
})
router.get('/celebrities/create',(req,res)=>{
 res.render('celebrities/new-celebrity')
})
router.post('/celebrities/create',async(req,res)=>{
  const celebrity = req.body
  const {name,occupation,catchPhrase} = celebrity
  !name || !occupation || !catchPhrase ? res.render('celebrities/new-celebrity') : null
  const foundedCelebrity = await Celebrity.findOne(celebrity)
  foundedCelebrity ? res.render('celebrities/new-celebrity') : null
  try{
    await Celebrity.create(celebrity)
   res.redirect('/celebrities')
  }catch(error){
    console.log(error)
    res.redirect('celebrities/new-celebrity')
  }
})

module.exports = router