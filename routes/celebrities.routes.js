const router = require("express").Router();
const celeb = require('../models/Celebrity.model');

// all your routes here
router.get('/create',(req,res) =>
    res.render('new-celebrity')
);

router.post('/create',(req,res) => {
    const {name, occupation, catchphrase} =req.body;
    celeb.create({name, occupation, catchphrase})
    .then(()=>res.redirect('/celebrities'))
    .catch(Err => console.log('error', Err))
});

router.get('/',(req,res) =>{
    celeb.find()
    .then(celeb =>
    res.render('celebrities', {celeb}))
    .catch(Err => console.log('error', Err))
});



module.exports = router;