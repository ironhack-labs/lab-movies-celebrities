// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");


const cookieParser = require("cookie-parser");


const favicon = require("serve-favicon");


const path = require("path");


module.exports = (app) => {

  app.use(logger("dev"));

 
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

 
  app.set("views", path.join(__dirname, "..", "views"));
  
  app.set("view engine", "hbs");
  
  app.use(express.static(path.join(__dirname, "..", "public")));

  
  app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));
};
