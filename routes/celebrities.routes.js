const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/celebrities', (req, res) => {
    Celebrity.find()
        .then(dataFromDb => {
            console.log('Data received:', dataFromDb);
            res.render('../views/celebrities/celebrities', { dataFromDb });
        })
        .catch(err => {
            console.log('An error happened:', err);
        })
});

router.get('/celebrities/create', (req, res) => {
    res.render('../views/celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res) => {
    Celebrity.create(req.body).then((data) => {
        console.log(`The celebrity ${data.name} has been added`);
        res.redirect('/celebrities');
    })
    .catch(err => {
        console.error(err);
    })
});

module.exports = router;