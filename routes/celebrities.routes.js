const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model')


router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity.hbs')
});


router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    async function createCelebrityInDb() {
        try {
            let createdCelebrity = await Celebrity.create({ name, occupation, catchPhrase })
            res.redirect('/celebrities')
        } catch (error) {
            console.log(error) 
            res.redirect('/celebrities/new-celebrity.hbs')
        }
    }
    createCelebrityInDb()
});

router.get('/celebrities', (req, res) => {
    async function findAllCelebritiesFromDb(){
    try {
        let allCelebritiesFromDb = await Celebrity.find();

        res.render('celebrities/celebrities.hbs', { celebrities: allCelebritiesFromDb })
    } catch (error) {
        console.log(error)
    }
}
    findAllCelebritiesFromDb()
});



module.exports = router;
