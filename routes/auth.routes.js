const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const saltRound = 10;
const bcrypt = require("bcrypt");

function isLoggedIn(req, res, next) {
	if (req.session.currentUser) next();
	// next invocation tells Express that the middleware has done all it work
	else res.redirect("/auth/login");
}

router.get("/profile", isLoggedIn, (req, res) => {
	//isLoggedIn is a middleware function which will be run before our handler is run
	res.render("auth/profile");
});


router.get("/signup", (req, res, next) => {
	res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
	const {
		username,
		password
	} = req.body;
	if (!username || !password) {
		res.render("auth/signup", {
			errorMessage: "Username and password are requiered",
		});
	}

	User.findOne({
			username
		})
		.then((user) => {
			if (user) {
				res.render("auth/signup", {
					errorMessage: "User already exists"
				});
			}

			const salt = bcrypt.genSaltSync(saltRound);
			const hashPassword = bcrypt.hashSync(password, salt);

			User.create({
					username,
					password: hashPassword
				})
				.then(() => res.render("index"))
				.catch((error) => res.render("auth/signup", {
					errorMessage: error
				}));
		})
		.catch((error) => next(error));
});

router.get("/login", (req, res, next) => {
	res.render("auth/login");
});

router.post("/login", (req, res, next) => {
	const {
		username,
		password
	} = req.body;
	if (!username || !password) {
		res.render("auth/login", {
			errorMessage: "Username and password are requiered",
		});
	}

	User.findOne({
			username
		})
		.then((user) => {
			if (!user) {
				res.render("auth/login", {
					errorMessage: "Incorrect user or password",
				});
			}
			const passwordCorrect = bcrypt.compareSync(password, user.password);
			if (passwordCorrect) {
				req.session.currentUser = user;
				res.redirect("/");
			} else {
				res.render("auth/login", {
					errorMessage: "Incorrect email or password",
				});
			}
		})
		.catch((err) =>
			console.log("There has been an error while loging in!", err)
		);
});

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) res.redirect("/");
		else res.redirect("/auth/login");
	});
});

module.exports = router;