const { Schema, model } = require("mongoose")


const celebritySchema = new Schema ({
 name: String,
 occupation: String,
 catchPhrase: {
 type: String,
 required: true
 }
})

module.exports = model('Celebrity', celebritySchema)
