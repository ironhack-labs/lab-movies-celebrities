const router = require("express").Router();

// All your routes here
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
  });

  router.post('/create', async (req, res) => {
    try {
      const { name, occupation, catchPhrase } = req.body;
      const celebrity = new Celebrity({ name, occupation, catchPhrase });
      await celebrity.save();
      res.redirect('/celebrities');
    } catch (error) {
      res.render('celebrities/new-celebrity', { error });
    }
  });
  

module.exports = router;
