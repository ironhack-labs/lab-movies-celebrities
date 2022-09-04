const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({

    name: { type: String },
    occupation: { type: String },
    catchPhrase: { type: String }
})

const celebrityModel = model('celebrities', CommentSchema);

module.exports = celebrityModel;
