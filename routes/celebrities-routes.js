const celebritiesRouter = require("express").Router();

const Celebrity = require('../models/Celebrity.model')


celebritiesRouter.get("/celebrities", (req, res) => {
  // res.send("celebrities");
  Celebrity
    .find()
    .then(celebrity => {
      // res.send(celebrity)
      res.render('celebrities/celebrities', {celebrity} )
    })
    .catch(err => {
      console.log(err)
    })

});

celebritiesRouter.get("/celebrities/create", (req, res) => {
    // res.send("conecto");
  res.render("celebrities/new-celebrity");
});

celebritiesRouter.post("/celebrities/create", (req, res) => {
  
  const { name, occupation, catchPhrase } = req.body
      // res.send("req.body");

  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(() => {
    res.redirect("/celebrities")
    })
    .catch(err => {
      console.log(err)
      res.render("celebrities/new-celebrity")
  })
});

module.exports = celebritiesRouter;
