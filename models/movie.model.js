const mongooose = require ("mongoose")
const { default: mongoose } = require("mongoose")

const celebritiesSchema = new mongoose.Schema ({

    title:{
        type: String,
    },
    genre:{
        type: String,
    },
    plot:{
        type: String,
    },
    cast:{
        enum:[String] 
    }

})

const CelebritiesModel = mongoose.model("celebreties",celebritiesSchema)
module.exports = CelebritiesModel