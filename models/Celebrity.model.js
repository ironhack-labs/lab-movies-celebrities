//  Add your code here

const {Schema, model} = require('mongoose');

const celebritySchema = new Schema({
    name: {
        type: String, 
        require: true,
    },
    occupation: {
        type: String, 
        require: true,
    },
    catchPhrase: {
        type: String, 
        require: true,
    },
}, 
{
    timestamps: true,
})

const Celebrity = model("Celebrity", celebritySchema)

module.exports = Celebrity;