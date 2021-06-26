const {Schema, model} = require('mongoose')

const celebritySchema = new Schema ({
    name:{
        type: String,
        unique: true
    },
    image: String,
    occupation: String,
    catchPhrase: String
},{
    timestamps: true
}
)

const Celebrity = model("Celebrity", celebritySchema)

module.exports = Celebrity

