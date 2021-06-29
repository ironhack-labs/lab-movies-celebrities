const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
    name: String,
    movie: {
        ref: 'movie',
        type: mongoose.Schema.Types.ObjectId
    },
    cast: {
        ref: 'celebrity',
        type: mongoose.Schema.Types.ObjectId
    }
});

let AwardModel = mongoose.model('award', AwardSchema);
module.exports = AwardModel;