const express = require('express');
const router = express.Router();
const Cele = require('../models/Celebrity.model');
//GET LIsTA
router.get('/lista', (req, res, next) => {
    Cele
        .find()
        .then(celes => res.render('cele/celelist', { celes }))
        .catch(err => console.log(err))
});


// GETT Creation
router.get('/crear', (req, res) => {
    res.render('cele/celecreate')
})

//POST Creation
router.post('/crear', (req, res) => {

    const { name, ocupation, catchPhrase } = req.body

    Cele
        .create({ name, ocupation, catchPhrase })
        .then(() => res.redirect('/lista'))//////no funciona xq no quiere
        .catch(err => console.log(err))
})






module.exports = router;
