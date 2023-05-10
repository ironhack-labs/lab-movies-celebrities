// Require Schema and model methods of mongoose
const {Schema, model} = require('mongoose');

const movieSchema = new Schema(
    // Info that is going to be prompt
    {
        title: String,
        genre: String,
        plot: String,
        cast: ["celebrity1", "celebrity2", "celebrity3"]
    }, 

    // MongoDB Options
    {
     timestamps: true
    }
);

module.exports = model('Movie', movieSchema);






