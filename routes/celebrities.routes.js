// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


// all your routes here

router.get('/celebrities/create', (req, res, next) => {
    res.render('new-celebrity')
});

router.post('/celebrities/create', (req, res, next) => {
    const {name , occupation, catchPhrase} = req.body;
    const newCelebrity = new Celebrity ({name, occupation, catchPhrase})

    newCelebrity.save()
    .then(() => {
        res.render('/celebrities')
    })
    .catch(err => res.render('/celebrities/new-celebritie', {err}))
});

module.exports = router;