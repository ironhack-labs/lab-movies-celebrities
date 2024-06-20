const { Schema, model } = require ("mongoose")

const celebritySchema = new Schema({

name:String,
occupation: String,
catchphrase:String

},
{timestamps: true
})


module.exports = model("celebrity",celebritySchema)