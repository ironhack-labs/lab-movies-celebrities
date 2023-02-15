const express = require('express');
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");



router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', async (req, res) => {
    try {
        const {name, occupation, catchPhrase} = req.body
        await Celebrity.create({name, occupation, catchPhrase})
        res.redirect("/celebrities")
    } catch (error) {
        console.log(error);
        res.redirect('/celebrities/new-celebrities')
    }
});

router.get("/celebrities", async (req, res, next) => {
    try {
        let celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', {celebrities});
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;