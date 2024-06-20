const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' }]
});

//Export the model
module.exports = mongoose.model('Movie', movieSchema);