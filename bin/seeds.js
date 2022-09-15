// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
//※※※※START-BOOK LIST※※※※※※※※※※※※※※


//※※※※※※※※※※※※※※※END-BOOK LIST※※※※※※※※※※※※※※

// Book.create(books)
//   .then(booksFromDB => {
//     console.log(`Created ${booksFromDB.length} books`);
 
//     // Once created, close the DB connection
//     mongoose.connection.close();
//   })
//   .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));