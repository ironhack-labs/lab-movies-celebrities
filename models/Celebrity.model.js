//  Add your code here
const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    catchPhrase: {
        type: String,
        required: true
    }
},
{
    virtuals: true,
});

celebritySchema.virtual("movies", {
    ref: 'Movie',
    localField: '_id',
    foreignField: 'celebs',
    justOne: false,
})


const Celebrity = mongoose.model('Celebrity', celebritySchema)

module.exports = Celebrity