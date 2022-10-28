const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/', async (req, res, next) => {
    try {
        const celebritiesFromDB = await Celebrity.find()
        res.status(200).json(celebritiesFromDB)
    } catch (error){
        next(error)
    }
})

router.post('/create', async (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;

    try {
        const newCelebrityFromDB = await Celebrity.create({name, occupation, catchPhrase});
        res.status(201).json(newCelebrityFromDB)
    } catch (error) {
        next(error)
    }
})

module.exports = router;