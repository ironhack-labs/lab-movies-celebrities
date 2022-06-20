//iteration #2
const {Schema, model} = require('mongoose');

const celebritySchema = new Schema({
    name:String,
    occupation:
    {
        type:String,
        enum:['actor', 'painter', 'producer','writer','director', 'actress', 'singer', 'musician', 'other'],
        default:'unknown'
    },
    catchPhrase:String
})

//export the model
module.exports = model('Celebrity', celebritySchema);