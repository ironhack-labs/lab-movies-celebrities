const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require("../models/Movie.model");

// all your routes here

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

router.post('/create', async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase} = req.body;
        await Celebrity.create({
            name,
            occupation,
            catchPhrase
        });
        res.redirect('/celebrities');
    } catch (error) {
		next(error);
        res.render('celebrities/new-celebrity');
	}
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const celebrity = await Celebrity.findById(id);
        res.render('celebrities/edit-celebrity', celebrity);
    }catch(error) {
        next(error);
    }
})

router.post('/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, occupation, catchPhrase} = req.body;
        await Celebrity.findByIdAndUpdate(id, 
            {
            name, 
            occupation,
            catchPhrase
            },
            {
            new: true
            }); 
            res.redirect('/celebrities');
    }catch(error) {
        next(error);
    }
})

router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Celebrity.findByIdAndDelete(id);

        res.redirect('/celebrities');
    }catch(error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const celebrity = await Celebrity.findById(id);
        res.render('celebrities/celebrity-details', celebrity);
    } catch(error) {
		next(error);
	}
})


router.get('/', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', { celebrities });
    } catch(error) {
		next(error);
	}
})

module.exports = router;