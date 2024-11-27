// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Celebrity = require('../models/Celebrity.model');

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-movies-celebrities";
 const Celebrity = [
    {
        celebName: "Leonardo DiCaprio",
         occupation: "Actor",
         catchPhrase: "Major teenage heartthrob in the 1990s"
    },
    {
        celebName: "Tom Cruise",
         occupation: "Actor",
         catchPhrase: "One of the top 100 movie stars of all time"
    },
    {
        celebName: "Charles Chaplin",
         occupation: "Writer" ,
         catchPhrase: "The most pivotal stars of the early days of Hollywood"
    },
    
 ] ;
 mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });