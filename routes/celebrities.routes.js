const router = require("express").Router();
module.exports = router;
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {res.render('celebrities/new-celebrity')})

router.post('/celebrities/create', (req, res)=>{

    const {name, occupation, catchPhrase} = req.body

    Celebrity.create({name, occupation, catchPhrase})
        .then(data=>{
            console.log('New celebrity:',data.name)
            res.redirect('/celebrities')
        })
        .catch(err => {console.log(err)
                        res.render('celebrities/new-celebrity')
        });
})

router.get('/celebrities',(req, res) => {

    Celebrity.find()
        .then(data =>{
            res.render('celebrities/celebrities',{ celebrity : data})
        })

})


