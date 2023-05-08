const router = require("express").Router();

const Celebritie = require('../models/Celebrity.model');

router.post('/celebrities/create', async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase } = req.body;
        const newCelebritie = await Celebritie.create({ name, occupation, catchPhrase });
        res.status(200).json(newCelebritie);
        
    } catch (error) {
        next(error);
    }
    
})

module.exports = router;