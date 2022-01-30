// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js')
// all your routes here
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(celebs => res.render('celebrities/celebrities.hbs', {celebs}))
    .catch(err => console.log(`Error loading drones : ${err}`));
});

router.get('/celebrities/create', (req, res, next) => res.render('celebrities/new-celebrity.hbs'));

router.post('/celebrities/create', (req, res, next) => {
    // Iteration #2: List the drones
    // ... your code here
    const {name,occupation,catchPhrase} = req.body;
    Celebrity.create({name,occupation,catchPhrase})
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.log(`Error creating celebs : ${err}`));

});

router.get('/celebrities/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Celeb.findById(id)
    .populate('cast')
    .then(celeb => {
        res.render('celebrities/edit-celebrity',{celeb})
    })
    .catch(err => console.log(`Error loading movie : ${err}`));
});

router.post('/celebrities/:id/edit', (req, res, next) => {
    const {id} = req.params;
    const {name,occupation,catchPhrase} = req.body;
    Celeb.findByIdAndUpdate(id,{name,occupation,catchPhrase})
    .then(() => res.redirect(`/celebrities/${id}/edit`))
    .catch(err => console.log(`Error loading movie : ${err}`));
});

router.post('/celebrities/:id/delete', (req, res, next) => {
    // Iteration #2: List the drones
    // ... your code here
    const {id} = req.params;
    Celebrity.findByIdAndDelete(id)
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.log(`Error deleting celeb : ${err}`));

});


module.exports = router;