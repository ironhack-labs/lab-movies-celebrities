const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model');

router.get('/', (req, res) => {
    Celebrity.find()
        .then(data => res.render('celebrities/celebrities', { data }))
        .catch(err => console.log("Error loading celebs from the DB ", err))
});

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res) => {
    Celebrity.create(req.body)
        .then(res.redirect('/celebrities'))
        .catch(err => {
            res.redirect('/celebrities/create')
            console.log("Error adding the celeb to the DB", err)
        });
});

router.get('/:id', (req, res) => {
    Celebrity.findById(req.params.id)
        .then(celeb => {
            console.log(celeb);
            //res.render('/celebrity-details', celeb);
        })
        .catch(err => console.log("Error loading the celeb", err));
});

module.exports = router;
