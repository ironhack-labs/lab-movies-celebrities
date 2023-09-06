const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// router.get("/celebrities/create", (request, response) => {
//   Celebrity.find().then((celebrities) => {
//     console.log(celebrities);
//     response.render("celebrities/celebrities.hbs", {
//       celebrities: celebrities,
//     });
//   });
// });

router.get("/celebrities/create", (request, response) => {
  response.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities-create", (request, response) => {
  const { name, occupation, catchPhrase } = request.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrityFromDB) => response.redirect("/celebrities"))
    .catch((err) => {
      // console.log(`Err while creating the post in the DB: ${err}`);
      // next(err);
      res.render('celebrities/new-celebrity', { error: 'Error creating celebrity.' });
    });
});

router.get('/celebrities', (req, res)=> {
  Celebrity.find()
  .populate()
  .then((celebrityFromDB) => {
      console.log("Celebrity from DB:", celebrityFromDB)
      res.render("celebrities/celebrities", {celebrity: celebrityFromDB })
  })
  .catch((err) => {
      console.log(`Err while getting the celebrity from the DB: ${err}`);
      next(err);
    });
})

module.exports = router;
