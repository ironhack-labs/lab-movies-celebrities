const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");


const MONGO_URI = "mongodb://localhost/clebrities-app"; 

mongoose
    .connect(MONGO_URI)
    .then((x) =>
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        )
    )
    .catch((err) => console.error("Error connecting to mongo: ", err));



const celebrities = [{
    
        name: "esto es una prueba",
        ocupacion: "hello bd",
        catchPhrase: "djfjksnjkdfnk",
        
    
}]
    
Celebrity.create(celebrities)
    .then((celebritiesFromDB) => {
        console.log(`Created ${celebritiesFromDB.length} books`);
        mongoose.connection.close();
    })
    .catch((err) =>
        console.log(
            `An error occurred while creating books from the DB: ${err}`
        )
    );