const mongoose = require('mongoose');
const Celebrity = require('.././models/Celebrity.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-celebreties"; // <- OJO, el mismo nombre que vayas a poner en el .env

mongoose
    .connect(MONGO_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo: ", err))


const celebrities = [{
    name: "pablo pit",
    occupation: "back-end artist arquitect of data",
    catchPhrase: "it's always best to ctr-c and ctr-v before writting"
}]


Celebrity
    .create(celebrities)
    .then(celebrities => {
        console.log(`Created ${celebrities.length}`)
        mongoose.connection.close();

    })
    .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));