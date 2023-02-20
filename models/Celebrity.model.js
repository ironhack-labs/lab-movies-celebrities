//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
    {
        name: String,
        ocuppation: String,
        catchPhrase: { type: String, required: true },
        participateMovies : [{type: Schema.Types.ObjectId, ref:'Movie'}]
    }
)

const Celebrity = model('Celebrity', celebritySchema);
module.exports = Celebrity;