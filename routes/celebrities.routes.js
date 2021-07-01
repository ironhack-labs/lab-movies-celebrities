// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const sessionInfo = require('../middleware/sessionInfo')

const Celebrity = require('../models/Celebrity.model');

router.get('/create', sessionInfo, (req, res) => {
      res.render('./celebrities/new-celebrity')
  })

router.post('/create', (req, res)=>{
    
  const { name, occupation, catchPhrase } = req.body

  Celebrity.create( {name, occupation, catchPhrase} )
  .then( () => {
    res.redirect('/celebrities');
  })
  .catch((err) => {
    console.log(err);
    res.render('new-celebrity')
  })
})

router.get('/', (req, res) => {

    Celebrity.find()
    .then((celebrityList) => res.render('./celebrities/celebrities', {celebrityList}))
    .catch((err) =>  console.log(err) )
})

module.exports = router;