const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const celebritySchema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
    
});

//Export the model
module.exports = mongoose.model('Celebrity', celebritySchema);