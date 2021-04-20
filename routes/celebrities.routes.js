const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const router = express.Router();


router.get("/new", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
});
router.post("/new", (req, res, next) => {
    Celebrity.create(req.body)
    .then((result) => {
        console.log(result)
        res.redirect("/celebrities/all")
    }).catch((err) => {
        console.log(err);
        res.render("celebrities/new-celebrity.hbs")
    });
});

router.get(`/all`, (req, res) => {
  Celebrity.find({})
    .then((result) => {
      res.render("celebrities/celebrities.hbs", { celebs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get(`/:_id`,(req,res)=>{
  Celebrity.findById(req.params)
  .populate(`cast`)
  .then((result) => {
      res.render("celebrities/celebrity-details", {celebs: result})
  }).catch((err) => {
      console.log(err);
      
  });
  })
  
  router.post(`/:_id/delete`, (req,res)=>{
      Celebrity.findByIdAndDelete(req.params._id)
      .then((result) => {
          console.log(result)
          res.redirect(`/celebrities/all`)
      }).catch((err) => {
          console.log(err);  
      }); 
  })
  
  router.get(`/:_id/edit`, (req,res)=>{
    res.render(`celebrities/edit-celebrity`)
    .then((result) => {
      console.log(result);
      })
    .catch((err) => {
      console.log(err);
      });
  })
  
  router.post(`/:_id/edit`, (req, res) => {
    Celebrity.findByIdAndUpdate(req.params._id, req.body)
      .then((result) => {
        console.log(result);
        res.redirect("/celebrities/all");
      })
      .catch((err) => {
        console.log(err);
      });
  });

module.exports = router;
