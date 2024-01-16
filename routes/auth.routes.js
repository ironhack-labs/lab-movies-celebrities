const router = require("express").Router();
const bcryptjs = require("bcryptjs")
const User = require("../models/User.model");

router.get("/signup", (req, res, next) => {
    res.render ("auth/sign-up");
});

router.post(("/signup"), (req, res, next)=>{
    const saltRounds = 10;
    const {username, email, password} = req.body;

    bcryptjs
    .genSalt(saltRounds)
    .then((salt)=>{
        return bcryptjs.hash(password, salt);
    })
    .then((hashedPassword)=>{
        return User.create({username, email, password: hashedPassword});
    })
    .then((user)=>{
        console.log("User was added:", user);
        res.redirect("/login");
    })
    .catch((err)=>{
        next(err);
    })
});


router.get("/login", (req, res, next) => {
    res.render ("auth/log-in");
});


router.post("/login", (req, res, next) => {
    const {email, password} = req.body;

    User.findOne({email: email})
    .then((user)=>{
        if (!user){
            res.redirect("/login");
            return;
        }
        else if (bcryptjs.compareSync(password, user.password)){
            req.session.currentUser = {username: user.username, email: user.email, _id: user._id};
            console.log("Current User:",  req.session.currentUser);
            res.redirect ("/");
        }
        else{
            res.redirect("/login");
        }
    })
    .catch((err)=>{
        next(err);
    })
});


router.post("/logout", (req, res, next) =>{
    req.session.destroy((err)=>{
        if(err) next(err);
        res.redirect ("/");
    })
});


module.exports = router;
  



