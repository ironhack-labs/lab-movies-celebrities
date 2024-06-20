const {Schema, model} = require('mongoose');

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [
            {
                type: Schema.Types.ObjectId,
                /* the ref is what changes */
                ref: 'Celebrity'  
            }
        ]
    }
);

// Exporting the model
module.exports = model('Movie', movieSchema);