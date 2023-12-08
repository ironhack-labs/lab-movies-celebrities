const User = require("../models/User.model");
const mongoose = require("mongoose");

module.exports.register = (req, res, next) => {
  res.render("users/register");
};

module.exports.login = (req, res, next) => {
  res.render("users/login", { errors: false });
};

module.exports.doRegister = (req, res, next) => {
  const { email, username } = req.body;

  User.findOne({ email }).then((dbUser) => {
    if (dbUser) {
      res.render("users/register", {
        user: {
          email,
          username,
        },
        errors: {
          email: "Este email ya esta en uso!",
        },
      });
    } else {
      User.create(req.body)
        .then(() => {
          res.redirect("/login");
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            res.render("users/register", {
              user: {
                email,
                username,
              },
              errors: err.errors, // {  EMAIL: 'lo que sea', PASSWOR: '', USERNAME: ''}
            });
          } else {
            next(err);
          }
        });
    }
  });
};

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body;

  const renderWithErrors = () => {
    res.render("users/login", {
      email,
      errors: true,
    });
  };

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return user.checkPassword(password).then((match) => {
          if (match) {
            req.session.userId = user.id; // genero cookie y session
            res.redirect(`/profile`);
          } else {
            console.log("Email o contraseña incorrectos"); // contraseña incorrecta
            renderWithErrors();
          }
        });
      } else {
        console.log("Email o contraseña incorrectos"); // no existe usuario con ese email
        renderWithErrors();
      }
    })
    .catch((err) => next(err));
};

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
};