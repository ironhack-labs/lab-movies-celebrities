//  Add your code here
const {Schema, model} = require('mongoose')

const movieSchema = new Schema(
    { 
        name: String,
        genre: String,
        plot: String,
        cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
    },
    {
        timestamps : true
    }
)


module.exports = model('Movie', movieSchema)