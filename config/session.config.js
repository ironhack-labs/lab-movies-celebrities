// config/session.config.js
 
// require session
const session = require('express-session');

const flash = require('connect-flash');
 
// ADDED: require mongostore
const MongoStore = require('connect-mongo');
 
// ADDED: require mongoose
const mongoose = require('mongoose');
 
module.exports = app => {
  app.set('trust proxy', 1);
 
  app.use(
    session({
      secret: "moviescelebrities",
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60000
      }, // ADDED code below !!!
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI 
 
        // ttl => time to live
        // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      })
    })
  );

  app.use(flash());
};