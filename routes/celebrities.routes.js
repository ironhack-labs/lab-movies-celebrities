const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/', (req, res) => {
    Celebrity
    .find()
    .then(info => {
        res.render('celebrities/celebrities', { info })
    })
    .catch(err =>{
        console.log(err)
    })
})

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity
    .create({name, occupation, catchPhrase})
    .then(
        res.redirect('/celebrities'))
    .catch(err =>{
        res.redirect('/celebrities/create')
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Celebrity
    .findById(id)
    .then(details => {
        res.render('celebrities/celebrity-details', details)
    })
    .catch(err =>{
        console.error(err)
    })
})

router.post('/:id/delete', (req, res)=>{
    const { id } = req.params
    Celebrity
    .findByIdAndRemove(id)
    .then(()=>{
        res.redirect('/celebrities')
    })
    .catch(err =>{
        console.error(err)
    })
})

router.get('/:id/edit', (req, res)=>{
    const { id } = req.params
    Celebrity
    .findById(id)
    .then(details =>{
        res.render('celebrities/edit-celebrity', { details })
    })
    .catch(err =>{
        console.error(err)
    })
})

router.post('/:id/edit', (req, res)=>{
    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body;
    Celebrity
    .findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then((data)=>{
        res.redirect(`/celebrities/${data._id}`)
    })
    .catch(err =>{
        console.error(err)
    })
})

module.exports = router;