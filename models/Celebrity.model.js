//  Add your code here
const {Schema, model} = require('mangoose');

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String,
    }
)

module.exports = model('Celebrity',celebritySchema)