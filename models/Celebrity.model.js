//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    occupation: {
        type: String,
        enum: ["actor", "singer", "comedian", "unknown"],
        required: true,
    },
    catchPhrase: {
        type: String,
        required: true,
    }
});

const celebModel = mongoose.model("celebModel", celebSchema)
module.exports = celebModel