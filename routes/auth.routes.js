const router = require("express").Router();
const bcryptjs = require("bcryptjs");
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
            password: hashedPassword,
            regular: true,
            admin: false,
            banned: false
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
            req.session.currentUser = {
                username: user.username, 
                email: user.email,
                _id: user._id,
                regular: user.regular,
                admin: user.admin,
                banned: user.banned
            };
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

router.get("/users", (req, res, next) => {
    if(!req.session.currentUser.admin){
        res.redirect("/")
    }

    User.find({$and: [{admin: {$ne: true}}, {banned: {$ne: true}}]})
    .then((users)=>{
      res.render("auth/users", {users});
    })
    .catch((err)=>{
      next(err);
    })
});


router.post("/users/delete/:id", (req, res, next) => {
    if(!req.session.currentUser.admin){
        res.redirect("/")
    }

    User.findByIdAndDelete(req.params.id)
    .then(()=>{
        req.flash("successMessage", "Your deletion was successful.");
        res.redirect("/users")
    })
    .catch((err)=> next(err));
});

router.post("/users/banUser/:id", (req, res, next) => {
    if(!req.session.currentUser.admin){
        res.redirect("/")
    }

    User.findByIdAndUpdate(req.params.id,{banned: true, regular: false})
    .then((user)=>{
        req.flash("successMessage", `${user.username} is now banned`);
        res.redirect("/users")
    })
    .catch((err)=> next(err));
});


  

module.exports = router;
  



