const { Schema, model } = require('mongoose')

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [String] /* [{
            type: Schema.Types.ObjectId,
            ref: 'Celebrity'
        }]  */  //cuidado aquí 

    },
    {
        timestamps: true
    }
)

module.exports = model('Movie', movieSchema)
