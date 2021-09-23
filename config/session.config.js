// config/session.config.js

const session = require("express-session");
const MongoStore = require("connect-mongo");

const generateSession = (app) => {
  app.set("trust proxy", 1);

  app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 600000, // CUANTO TIEMPO EXPIRA LA COOKIE
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
    })
  );
};

module.exports = generateSession;
