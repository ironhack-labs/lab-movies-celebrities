const alert = require("alert");

function ifLoggedIn(req, res, next) {
	
    console.log(req.session.currentUser);
  
      if (!req.session.currentUser) {
      
      next();
      
    } else {
      alert("You are already logged in you dummy!");
      res.redirect('/');
      }
  }
  
  module.exports = ifLoggedIn