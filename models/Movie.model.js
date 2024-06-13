const { Schema, model } = require('mongoose')

const modelSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrity'
        }]
    }, {
    timestamps: true
}
)

const Movie = model('Movie', modelSchema);
module.exports = Movie;