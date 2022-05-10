//  Add your code here
const mongoose = require ("mongoose")
//const { default: mongoose } = require("mongoose")//

const celebritiesSchema = new mongoose.Schema ({

    name: {
        type: String,
    },
    occupation: {
        type: String,
    },
    catchPhrase: {
        type: String
    }

})

const CelebrityModel = mongoose.model("celebrities", celebritiesSchema);
module.exports = CelebrityModel;

