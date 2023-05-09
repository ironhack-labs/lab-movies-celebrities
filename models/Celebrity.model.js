let {Schema, model} = require('mongoose');

let CelebSchema = new Schema(
    {
     name: String,
     occupation: String,
     catchPhrase : String,
    }, 
    {
     timestamps: true
    }
);

module.exports = model('Celebrity', CelebSchema);