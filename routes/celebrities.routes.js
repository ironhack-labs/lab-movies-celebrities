const express = require('express');
const router = express.Router();

router.get("/celebrities/create", (req,res) => {
    res.render("/celebrities/create");
})

router.post("/celebrities/create", (req,res) => {
    const newCelebrity = req.body;
    Celebrity.create(newCelebrity)
    .then(() => {
        res.redirect('/celebrities');
      })
      .catch((error) => {
        res.render('celebrities/new-celebrity', { error: error });
      });
})


router.get('/celebrities', (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render('celebrities/celebrities', { celebrities });
      })
      .catch((error) => {
        res.status(500).send('Error celebrities', error);
      });
  });

module.exports = router;
