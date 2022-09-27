


//PROTECTING ROUTES
//IF NOT LOGGED THEN YOU GET redirected to `/login'
const isLoggedIn = (req, res, next) => {
    if(!req.session.currentUser) {// if the req.session.currentUser doesn't exist then redirect user to login page desu. req.session.currentUser exsiting would be proof that authenticated user has "cookie with session id" 
        return res.redirect('/login');
    }
next();
};




const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {  //if the req.session.currentUser exists then the user is redirected if they try to go to the login page.
        return res.redirect('/');
    }
    next();
  };

   
module.exports = {
    isLoggedIn,
    isLoggedOut
  };