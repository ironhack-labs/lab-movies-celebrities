const router = require("express").Router();
const User = require("../models/User.model");
const session = require("express-session");
//Bcryptjs
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
//Mongoose
const mongoose = require("mongoose");
//Authentication
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

////////LOG IN/////////

//Login route
router.get("/login", (req, res) => {
  res.render("auth/login");
});

//Log in form
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/login", {
      errorMessage: "Sorry, you forgot to fill all the fields. Try again",
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Username is not registered",
        });
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password" });
      }
    })
    .catch((error) => next(error));
});

////////SIGN UP/////////

//Sign-up route
router.get("/sign-up", (req, res) => {
  res.render("auth/signup");
});

//Sign Up form
router.post("/sign-up", (req, res, next) => {
  const { username, password } = req.body;

  //all fields are required
  if (!username || !password) {
    res.render("auth/signup", {
      errorMessage: "All fields are mandatory!",
    });
    return;
  }

  //validating strenght of the password
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage: "6 characters 1 number 1 lowercase 1 uppercase letter",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salted) => bcryptjs.hash(password, salted))
    .then((hashPassword) => {
      return User.create({ username, password: hashPassword });
    })
    .then((createdUser) => {
      res.redirect("/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage:
            "Username already registered. Please try using another username.",
        });
      } else {
        next(error);
      }
    });
});

module.exports = router;
