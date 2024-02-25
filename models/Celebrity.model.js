const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const celebritySchema = new Schema(
    {
        name: {
            type:String,
            require: true
        },
        occupation: { 
            type: String,
            require: true,
        },
        age: { 
            type: Number,
            require: true,
        },
        nationality: {
            type: String,
            require:false

        }
});

const Celebrity = mongoose.model('Celebrity',celebritySchema)
module.exports = Celebrity;