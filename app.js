
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const createError = require('http-errors');

require('./config/db.config');
require('./config/hbs.config')

const app = express();

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(express.urlencoded());

const router = require('./config/routes.config')
app.use('/', router);

app.use((error, req, res, next) => {
  if(error instanceof mongoose.Error.CastError && error.message.includes("_id")){
    error = createError(404, "resource not found")
  } else if(!error.status){
    error = createError(500, error)

  }
  console.error(error);
  res.status(error.status).render(`errors/${error.status}`)
})










const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

module.exports = app;
