//  Add your code here

const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
    {
        title: String,
        description: String,
        author: String,
        rating: Number
    },
    {
        timestamps: true
    }
);

module.exports = model('Celebrity', celebritySchema)
