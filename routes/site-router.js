const express = require('express');
const siteRouter = express.Router();

const isLoggedIn = require("./../middleware/isLoggedIn")


siteRouter.get('/protected', isLoggedIn, (req, res, next) => {
	res.render('site/protected-webpage');
});


// siteRouter.get('/personal', (req, res, next) => {
// 	res.render('site/personal-webpage');
// });

// siteRouter.get('/profile', (req, res, next) => {
// 	res.render('site/profile-webpage');
// });

siteRouter.get('/', isLoggedIn, (req, res, next) => {
	res.render('site/index');
});

module.exports = siteRouter;

