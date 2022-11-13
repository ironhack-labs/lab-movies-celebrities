//  Add your code here
const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: mongoose.Types.ObjectId,
            ref: 'Celebrity'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Movies', moviesSchema);


// cast - Conjunto de ID de objetos que hacen referencia al modelo Celebrity(básicamente, el conjunto de ID de celebridades)