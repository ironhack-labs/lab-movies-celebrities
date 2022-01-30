//  Add your code here
const {Schema, model} = require('mongoose')

const celebritySchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    ocupation: {
        type: String,
        default: Unknow,
    },
    catchPhrase:{
        type: String,
        required: true,
    }
});

const Celebrity = model('Celebrity', celebrityschema);

module.exports = Celebrity;