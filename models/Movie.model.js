const {Schema, model} = require('mongoose');

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: {
            type: String,
            trim: true
        },
        cast: Array(
            {
                type: Schema.Types.ObjectId, 
                ref: "Celebrity"
            }
        )
    },
    {
        timestamps: true
    }
);

module.exports = model('Movie', movieSchema);