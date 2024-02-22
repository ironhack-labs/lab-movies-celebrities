const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res)=>{
    res.render('celebrities/new-celebrity')
})
router.post('/create', (req, res)=>{
const {name, occupation, catchPhrase} = req.body;
Celebrity.create({name, occupation, catchPhrase})
.then(()=>{
    res.redirect('/celebrities')
})
.catch((error)=>{
    console.log(error)
})
})

router.get('/', (req, res)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("celebrities/celebrities",{allCelebrities});
    })
    .catch((error)=>{
        console.log(error)
    })
})
module.exports = router;