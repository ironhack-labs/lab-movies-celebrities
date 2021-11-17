// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')
// all your routes here
router.get('/create', (req, res, next) => {
  res.render('./celebrities/new-celebrity.hbs')
})

router.post('/create', async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body
  try {
    const newCelebrity = await Celebrity.create({ name, occupation, catchPhrase })
    res.render('./celebrities/celebrities.hbs', newCelebrity )
  } catch (err) {
    res.render('./celebrities/new-celebrity.hbs', { errMsg: 'Something was Wrong' })
  }

})

router.get('/', async (req, res, next) => {
    try{
        const allCelebrities = await Celebrity.find()
        console.log(allCelebrities)
        res.render('./celebrities/celebrities.hbs',{allCelebrities})
    }catch{
        res.render({ errMsg: 'Something was Wrong' })

    }
  })

module.exports = router
