const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res)=>{
    const {name, occupation, catchPhrase } = req.body

    Celebrity
        .create({name, occupation, catchPhrase})
        .then(res.redirect('/celebrities/celebrities'))
        .catch(err => console.log(err))

})

router.get('/celebrities',(req, res) =>{
    Celebrity
        .find()
        .then(celeb => res.render('celebrities/celebrities', {celeb}))
        .catch(err => console.log(err))
  
})


module.exports = router;