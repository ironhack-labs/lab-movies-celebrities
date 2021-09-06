const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router(); 
 


router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
}) 

router.post('/celebrities/create', (req, res) => { 
    const {name , occupation , catchPhrase} = req.body; 

    Celebrity.
    create({name, occupation, catchPhrase}) 
    .then(celebrity => {
        res.redirect('/celebrities');
    }) 
    .catch(err => console.log(err)); 
}) 
 

router.get('/celebrities' , (req, res) => {
     Celebrity. 
     find() 
     .then((celebrities) => {
         res.render('./celebrities/celebrities' , {celebrities}); 
     }) 
     .catch(err => console.log(err));              
})


module.exports = router; 

