//iteration #2
const {Schema, model} = require('mongoose');

const celebritySchema = new Schema({
    name:String,
    occupation:
    {
        type:String,
    },
    catchPhrase:String
})

//export the model
module.exports = model('Celebrity', celebritySchema);