//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    occupation: {
        type: String
        
    },
    catchPhrase:{
        type: String,
        maxlength:200
    }
});

const Celebrity = model('Celebrity', celebritySchema);

module.exports = Celebrity;