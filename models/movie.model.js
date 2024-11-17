//  Add your code here
const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    genre: {
        type: String,
        required: true
    },
    plot: {
        type: String
    },
    cast: [{ type: Schema.Types.ObjectId, ref: 'celebrity' }] 
})



const movie = mongoose.model('movie', movieSchema)

module.exports = movie;
