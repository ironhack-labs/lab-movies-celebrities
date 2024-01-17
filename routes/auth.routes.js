const router = require("express").Router();
const bcryptjs = require("bcryptjs")
const User = require("../models/User.model");

router.get("/signup", (req, res, next) => {
    res.render ("auth/sign-up");
});

router.post(("/signup"), async (req, res, next)=>{
    const saltRounds = 10;
    const {username, email, password} = req.body;

    // bcryptjs
    // .genSalt(saltRounds)
    // .then((salt)=>{
    //     return bcryptjs.hash(password, salt);
    // })
    // .then((hashedPassword)=>{
    //     return User.create({username, email, password: hashedPassword});
    // })
    // .then((user)=>{
    //     console.log("User was added:", user);
    //     res.redirect("/login");
    // })
    // .catch((err)=>{
    //     next(err);
    // })

    try{
        const salt = await bcryptjs.genSalt(saltRounds);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        
        req.flash("successMessage", "Your account was succesfully created.")
        res.redirect("/login");
    } catch(err) {
        req.flash("errorMessage", "Sign up unsuccessful " + err)
        res.redirect("/signup");
    }
});


router.get("/login", (req, res, next) => {
    res.render ("auth/log-in");
});


router.post("/login", (req, res, next) => {
    const {email, password} = req.body;

    if (email === '' || password === '') {
        req.flash("errorMessage", "Password and email cannot be blank");
        res.redirect('/login');
        return;
    }

    User.findOne({email: email})
    .then((user)=>{
        if (!user){
            req.flash("errorMessage", "Password or email are incorrect.");
            res.redirect("/login");
            return;
        }
        else if (bcryptjs.compareSync(password, user.password)){
            req.session.currentUser = {username: user.username, email: user.email, _id: user._id};
            console.log("Current User:",  req.session.currentUser);
            req.flash("successMessage", "You successfully logged in.");
            res.redirect ("/");
        }
        else{
            req.flash("errorMessage", "Password or email are incorrect.");
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
  



