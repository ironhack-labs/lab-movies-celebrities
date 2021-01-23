const express =require('express');

const celebrityRouter = express.Router();

const Celebrity= require('../models/celebrity.model');


celebrityRouter.get('/celebrities/new', (req, res, next) => {
      res.render(`/celebrities/new-celebrity`);
  });

  celebrityRouter.post("/", (req, res, next) => {
   
  
    Celebrity.create(req.body)
      .then((newCelebrity) => {
        // console.log("New celeb: ", newCelebrity);
        res.redirect("/celebrities");
      })
      .catch((err) => console.log("Err while creating new celebrity: ", err));
  });

  celebrityRouter.get("/", (req, res, next) => {
    Celebrity.find()
      .then((allCelebrities) => {
        res.render("celebrities/celebrities", { allCelebrities });
      })
      .catch((err) => console.log("Err while getting all celebrities: ", err));
  });
module.exports = celebrityRouter;
 