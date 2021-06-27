const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const celebritieSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    ocuppation: String,
    catchPrase: String
},


    {
        timestamps: true
    })

const Celebrities = model("Celebrities", celebritieSchema);

module.exports = Celebrities;
