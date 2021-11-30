// require session
const session = require('express-session');
// to strore the session in the DataBase
const MongoStore = require('connect-mongo');

// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = (app) => {
  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there

  // required for the app when deployed to Heroku (in production)
  app.set('trust proxy', 1);

  // use session
  app.use(
    session({
      // the cookie is hashed with the SESS_SECRET
      secret: process.env.SESS_SECRET,
      // resave in Mongo if anything changes in MongoDB
      resave: true,
      saveUninitialized: false,
      cookie: {
        // restriction on the cookie where it can come from
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        // is the request coming from https?
        secure: process.env.NODE_ENV === 'production',
        // client cannot access the cookie with JavaScript
        httpOnly: true,
        maxAge: 60000, // 60 * 1000 ms === 1 min
      },
      store: MongoStore.create({
        mongoUrl:
          process.env.MONGODB_URI ||
          'mongodb://localhost/lab-movies-celebrities',
        // the session expires when the cookie expires
        // if the cookie expiration is not set,
        // then the expiration date will be determined by ttl (stands for time to live) property inside store object
        // ttl => time to live
        // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      }),
    })
  );
};
