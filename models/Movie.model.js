const {Schema, model, default: mongoose} = require('mongoose');

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{type: mongoose.Schema.Types.ObjectId, ref: 'Celeb'}]
    }
)

module.exports = model('Movie', movieSchema)