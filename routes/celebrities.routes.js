const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')


module.exports = router;

router.get("/celebrities/create", async (req, res, send) => {
    try {
    /* const celebrities = await Celebrity.find() */
    res.render('celebrities/new-celebrity')
    } catch(error) {
        console.log(error)
        next(error)
    }
})

router.post("/celebrities/create", async (req, res, send) => {
    try {
      const{name, occupation, catchPhrase} = req.body;
      await Celebrity.create({name, occupation, catchPhrase});
      res.redirect(`/celebrities`)

    } catch (error) {
        console.log(error)
    }
})

router.get('/celebrities', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', {celebrities})
        console.log(celebrities);
    } catch (error) {
        console.log(error)
    }
})



