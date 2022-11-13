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

 celebritiesRouter.get("/celebrities/:celebrity_id", (req, res) => {
    // res.send("conecto");
  const {celebrity_id} = req.params
    
  // res.send('conected')
    Celebrity
      .findById(celebrity_id)
      .then(celebrity => {
        // res.send(celebrity)
        res.render('celebrities/celebrity-details', celebrity)
      })
      .catch(err => {
        console.log(err)
      })
 });

 celebritiesRouter.get("/celebrities/:celebrity_id/edit", (req, res) => {
  
   const {celebrity_id} = req.params

  Celebrity
    .findById(celebrity_id)
    .then(celebrity => {
      // res.send(celebrity)
      res.render("celebrities/edit-celebrity", celebrity)
    })
    .catch(err => {
      console.log(err)
    })
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


celebritiesRouter.post("/celebrities/:celebrity_id/edit", (req, res) => {
  
  const { name, occupation, catchPhrase } = req.body

  const {celebrity_id} = req.params

  Celebrity
      .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
      .then(() => {
        // res.send(celebrity)
        res.redirect("/celebrities")            
      })      
      .catch(err => {      
        console.log(err)
      })  
});


celebritiesRouter.post("/celebrities/:celebrity_id/delete", (req, res) => {
  
   const {celebrity_id} = req.params

  Celebrity
    .findByIdAndDelete(celebrity_id)
    .then((celebrity) => {
      // res.send(celebrity)
      res.redirect('/celebrities')
    })
    .catch(err => {
      console.log(err)
    })
});


module.exports = celebritiesRouter;
