//  Add your code here
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: mongoose.Types.ObjectId,
            ref: 'Celebrity'       // Nombre del modelo
        }],
    },
    {
        timestamps: true
    }
);

const Movies = mongoose.model('Movies', movieSchema);
module.exports = Movies