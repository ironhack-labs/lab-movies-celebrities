//  Add your code here

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema ({
    name: {type: String, unique:true},
    occupation: {type: String},
    catchPhrase: {type: String, unique:true, require:true}
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports= Celebrity;
