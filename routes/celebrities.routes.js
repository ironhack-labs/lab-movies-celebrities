const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")


router.get('/create', async(req, res)=>{
    res.render('celebrities/new-celebrity')
})

router.post('/create', async(req, res)=>{
    const newCelebrity = req.body
    try{
        await Celebrity.create(newCelebrity)
        res.redirect('/celebrities/celebrities')
    }catch(error){
        res.redirect('/celebrities/create')
    }
})

router.get('/celebrities', async(req, res) =>{
    const celebrities = await Celebrity.find()
    res.render('celebrities/celebrities', {celebrities})
})

router.get('/:celebrityId', async(req, res)=>{
    const celebrityId = req.params.celebrityId 
    const celebrityDetails = await Celebrity.findById(celebrityId)
    res.render('celebrities/celebrity-details', {celebrityDetails})
})

router.post('/:celebrityId/delete', async(req, res)=>{
    const celebrityId = req.params.celebrityId 
    await Celebrity.findByIdAndDelete(celebrityId)
    res.redirect('/celebrities/celebrities')
})

router.get('/:celebrityId/edit', async(req, res)=>{
    const celebrityId = req.params.celebrityId
    const celebrity = await Celebrity.findById(celebrityId)
    res.render('celebrities/edit-celebrity', {celebrity})
})

router.post('/:celebrityId/edit', async(req, res)=>{
    const celebrityId = req.params.celebrityId
    const updatedCelebrity = req.body
    const celebrity = await Celebrity.findByIdAndUpdate(celebrityId, updatedCelebrity)
    res.redirect(`/celebrities/${celebrityId}`)
})


module.exports = router;