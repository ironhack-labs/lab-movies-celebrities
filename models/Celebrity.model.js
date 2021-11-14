//  Add your code here
const moongose = require('mongoose');
const Schema = moongose.Schema


const celebritySchema = new Schema({
	name: {
		type: String,
		trim: true,
	},
	occupation: {
		type: String,
		trim: true,
	},
	catchPhrase: {
		type: String,
		trim: true,
	}
});

Celebrity = moongose.model('Celebrity', celebritySchema);

module.exports = Celebrity;