//  Add your code here
const {Schema, model} = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
},
{
    timestamps: true
}
)



module.exports = model('Celebrity', celebritySchema)