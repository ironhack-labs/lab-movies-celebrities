//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema({
    name: {
        type: String,
        minlength: 1,
        required: true,
    },
    occupation: String,
    catchPhrase: String,
    inMovie: Boolean,
    movies: [{
        type: Schema.Types.ObjectId,
        ref: "Movie"
    }]
});

module.exports = model('Celebrity', celebritySchema);