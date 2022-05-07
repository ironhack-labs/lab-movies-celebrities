//  Add your code here
const {Schema,model} = require('mongoose');

const celebritySchema = new Schema ({
    name : {
        type : String, 
        required : true
    },
    occupation : {
        type : String, 
        required : true
    },
    catchPhrase : {
        type : String
    }
});

//Creating the Model
const Celebrity = model("celebrity",celebritySchema);

//Exporting the Model
module.exports = Celebrity;

