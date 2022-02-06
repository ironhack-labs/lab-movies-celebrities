//  Add your code here
const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        plot: {
            type: String,
            required: true
        },
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrity',
        }]           
    },
    {
        timestamps: true
    }
);

module.exports = model('Movie', movieSchema)