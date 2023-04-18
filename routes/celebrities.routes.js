const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
// Define route for getting a list of celebrities

router.get("/", async (req, res) => {
  try {
    // Fetch the list of celebrities from the database
    const celebrities = await Celebrity.find();
    // Render the view with the list of celebrities
    console.log(celebrities);
    res.render("celebrities/list", { celebrities });
  } catch (error) {
    // Handle any errors that occur during fetching
    res.render("error", { error });
  }
});

router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});


router.post('/create', async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('/celebrities');
  } catch (error) {
    res.render('celebrities/new-celebrity', { error });
  }
});
module.exports = router;