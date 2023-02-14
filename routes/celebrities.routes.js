const router = require("express").Router()
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

router.get('/', async(req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render('celebrities/celebrities', {celebrities: allCelebrities})
    } catch (error) {
        next(error)
    }
})

router.get('/create', async (req, res, next) => {
        res.render('celebrities/new-celebrity')
    })

router.post('/create', async (req, res, next) => {
    console.log(req.body) 
    const celebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }
  // res.send(req.body)
    try {
        const newlyCreatedCelebrity = await Celebrity.create(celebrity)
        console.log(newlyCreatedCelebrity)
        res.redirect('/celebrities')
        } catch (error) {
            return res.redirect('/celebrities/new-celebrity')
            console.log(error)
            next(error)
        }
})

module.exports = router