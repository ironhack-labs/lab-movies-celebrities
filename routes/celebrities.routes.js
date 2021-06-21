const router = require("express").Router();

// Create
router.get('/celebrities/create', (req, res) => res.render('/views/celebrities/new-celebrity.hbs')); // Get
router.post('/celebrities/create', (req, res) => {
    Celebrity.create(req.body)
        .then(() => res.redirect('/views/celebrities.hbs'))
        .catch(() => res.redirect('/views/celebrities/new-celebrity.hbs'))
}); // Post

module.exports = router;