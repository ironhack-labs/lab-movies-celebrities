//  Add your code here
const mongooose = require ("mongoose")
const { default: mongoose } = require("mongoose")

const celebritiesSchema = new mongoose.Schema ({

    name:{
        type: String,
    },
    occupation:{
        type: String,
    },
    catchPhrase:{
        type: String
    }

})

const CelebritiesModel = mongoose.model("celebreties",celebritiesSchema)
module.exports = CelebritiesModel

