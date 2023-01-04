const { Schema,model } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    plot: {
        type: String
    },
    _cast: [{
        type:Schema.Types.ObjectId,
        ref:"Celebrity"
    }]
},
{
    timestamps:true
})

module.exports = model('Movie', movieSchema);