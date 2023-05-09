const router = require("express").Router();

const Celebritie = require('../models/Celebrity.model');

router.post('/celebrities/create', async (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    try {
        const newCelebritie = await Celebritie.create({ name, occupation, catchPhrase });
        res.status(200).json(newCelebritie);
        
    } catch (error) {
        next(error);
    }
    
})

router.get('/celebrities', async (req, res, next) => {
    const { page, limit } = req.query;
    try {
        const allCelebrities = await Celebritie.find().limit(limit).skip(limit * (page - 1));
        res.status(200).json(allCelebrities);    
    } catch (error) {
        next(error);
    }
})

module.exports = router;