// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model");

// all your routes here
router.get('/create', (req,res) => {
    res.render("celebrities/new-celebrities")})

router.post('/create',(req,res)=> {
    const { name, occupation, catchPhrase} = req.body

  
  Celebrity
   .create({ name, occupation, catchPhrase })
   .then(() => res.redirect('/celebrities'))
   .catch(err => res.render('celebrities/new-celebrities'))

})

 router.get('/', (req,res)=> {

     Celebrity
         .find()
         .select('name occupation catchPhrase')
         .then((theCelebrities)=> res.render('celebrities/celebrities',{theCelebrities}))
 })

module.exports = router;

