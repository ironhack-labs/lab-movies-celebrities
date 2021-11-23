const router = require("express").Router();
const Celebrity = require ('../models/Celebrity.model');

router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity");
});
  
router.post('/celebrities/create',(req, res, next) => {
   const celebrity = req.body;

   Celebrity
   .create(celebrity)
   .then(()=> res.redirect("/celebrities"))
   .catch((error) => next(error));
});

router.get('/celebrities', (req, res, next) => {
  const celebrity = req.body;

    Celebrity
    .find(celebrity)
    .then((celebrities) => {
      console.log(celebrities);
      res.render("celebrities/celebrities.hbs", [celebrities]);
    })
    .catch((err) => {
      console.log(err);
    });
  
  });
  


module.exports = router;