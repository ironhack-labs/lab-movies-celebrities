const mongoose = require('mongoose');
const CelebrityModel = require('./Celebrity.model');
const { Schema, model } = mongoose;

const MovieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
       type: Schema.Types.ObjectId,
       ref: 'Celebrity'
    }]
});

module.exports = model('Movie', MovieSchema);