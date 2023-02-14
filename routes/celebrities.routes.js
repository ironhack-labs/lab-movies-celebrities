/* const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/celebrities/new-celebrities', (req, res) => res.render('celebrities/new-celebrities'));

router.post('/celebrities/new-celebrities', async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('celebrities');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/celebrities/celebrities', async (req, res, next) => {

  try {
    let celebrities = await Celebrity.find()
    res.render("celebrities/celebrities", {celebrities})
  } catch (error) {
    console.log(error)
    next(error)
  } 
});

module.exports = router; */