const express = require("express");
const authRouter = express.Router();
const User = require("../models/User.model")
const mongoose = require("mongoose");
const ifLoggedIn = require('../middleware/ifLoggedIn')

const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT || 10;

//const zxcvbn = require("zxcvbn");


authRouter.get("/signup", ifLoggedIn, (req, res) => {
  res.render("auth-views/signup");
});

authRouter.post("/signup", (req, res, next) => {

  const { username, password } = req.body;

  if (username === "" || password === "" || password.length < 5) {
    res.render("auth-views/signup", {
      errorMessage: "Username and Password are required.",
    });
    return; 
  }

  /*const passwordStrength = zxcvbn(password).score;

    if (passwordStrength < 3) {
        res.render("auth-views/signup", {
        errorMessage: "Password is too weak",
        });
        return;
    }*/

  User.findOne({ username }) 
    .then((userObj) => {
      if (userObj) {
        res.render("auth-views/signup", {
          errorMessage: `Username ${username} is already taken.`,
        });
        return;
      } else {
       
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        User.create({ username, password: hashedPassword })
          .then(() => {
            res.redirect("/");
          })
          .catch((err) => {
           if(err instanceof mongoose.Error.ValidationError){
            res.render("auth-views/signup", {
              errorMessage: err.message,
            });
           } else{
             next(err)
           }
          });
      }
    })
    .catch((err) => next(err));
});


authRouter.get("/login", ifLoggedIn, (req, res) => {
    res.render("auth-views/login");
  });

authRouter.post("/login", (req, res)=>{
  
  const {username, password} = req.body


  if (username === "" || password === "") {
    res.render("auth-views/login", { errorMessage: "Username and Password are required." });
    return; 
  }

  User.findOne({username})
  .then(user=>{
    console.log("User is " + user)
         if (!user) {
          res.render("auth-views/login", { errorMessage: "Input invalid" });
        } else {
        const encryptedPassword = user.password;
        const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);

        if(passwordCorrect){
          req.session.currentUser = user;
          res.redirect("/")
        } else {
          res.render("auth-views/login", { errorMessage: "Name OR pwd is incorrect" });
        }
        }
  })

})


authRouter.get('/logout', (req, res)=>{
  req.session.destroy(err =>{
    if(err){
      res.render("error", { message: "Something went wrong! Yikes!" });
    }else{
      console.log("You have successfully logged out!")
      res.redirect('/')
    }
  })
})



module.exports = authRouter;
