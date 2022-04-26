const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')


router.get('/create',(req,res) => {
    res.render('celebrities/new-celebrities')
})

router.post('/create',(req,res) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity
        .create({name, occupation, catchPhrase})
        .then(newCelebrity => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})

router.get('/',(req,res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', {celebrities})
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {
    const {id} = req.params

    Celebrity
      .findByIdAndDelete(id)
      .then (deletedCelebrity => {
        res.redirect(`/celebrities`)
      })
      .catch(err => console.log(err))
  });


module.exports = router; 