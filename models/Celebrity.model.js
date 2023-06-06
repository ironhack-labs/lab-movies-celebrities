const mongoose = require("mongoose")
const celebritySchema = new mongoose.Schema({
	name: String,
	occupation: {
		type: String,
		default: "unknown"
	},
	catchPhrase: {
		type: String,
		required: true
	},
});
module.exports = mongoose.model("Celebrity", celebritySchema);