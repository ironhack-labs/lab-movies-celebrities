function isBanned (req, res, next){
    if(req.session.currentUser.banned){
        req.flash("bannedMessage", "I am sorry your account was banned :(");
        res.redirect ("/")
    }
    next();
}

module.exports = isBanned;