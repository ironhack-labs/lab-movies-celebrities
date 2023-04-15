const router = require("express").Router();

router.get('/celebrities/celebrities', (req, res, next) => res.render('celebrities'));

router.get('/', (req, res, next) => res.render('new-celebrity'));

module.exports = router;