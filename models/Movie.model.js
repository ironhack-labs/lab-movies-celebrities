const mongoose = require ('mongoose')
const movieSchema = new mongoose.Schema({

    title: {
        type : String,
        required : [true, 'Title is required'] 
    },
    genre: {
        type: String,
    },
    plot: {
        type: String,
    },
    cast: {
        type:[String, mongoose.Schema.Types.ObjectId],
        ref: 'Celebrity',
        
    }

})

const Movies = mongoose.model('Movies', movieSchema)
module.exports = Movies