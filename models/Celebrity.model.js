//  Add your code here

const { Schema, model } = require('mongoose')

const celebritiesSchema = new Schema({

    name: { type: String },
    occupation: { type: String },
    catchPhrase: { type: String }

},
    {
        timestamps: true
    })


module.exports = model('celebrities', celebritiesSchema)