function isLoggedIn (req, res, next){
    if(!req.session.currentUser){
        res.redirect("/login");
    }
    next();
}

module.exports = isLoggedIn;