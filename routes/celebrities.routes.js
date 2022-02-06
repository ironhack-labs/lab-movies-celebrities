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

router.get('/celebrities/:id', (req, res)=>{
    const {id} = req.params
  
    Celebrity
        .findById(id)
        .then(celeb => res.render('celebrities/celeb-details', {celeb}))
        .catch(err => console.log(err))

})

router.get('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celeb => res.render('celebrities/edit-celeb', { celeb }))
        .catch(err => console.log(err))

})

router.post('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params
    const{name, occupation, catchPhrase} = req.body
    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(res.redirect(`/celebrities/celebrities/${id}`))
        .catch(err => console.log(err))

})

router.post('/celebrities/:id/delete', (req, res) => {
    const { id } = req.params
    console.log(`Deleting ${id}`)

    Celebrity
        .findByIdAndDelete(id)
        .then(res.redirect("/celebrities/celebrities/"))
        .catch(err => console.log(err))

})


module.exports = router;