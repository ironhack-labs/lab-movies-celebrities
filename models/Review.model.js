const {Schema, model} = require('mongoose');

const reviewScema = new Schema({
    content: String,
    cast: {
        type: Schema.Types.ObjectId,
        ref: 'MovieCast'
    }
});

module.exports = model('Review', reviewScema);