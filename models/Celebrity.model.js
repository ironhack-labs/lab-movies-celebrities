/** @format */

//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = Schema({
	name: String,
	occupation: String,
	catchPhrase: String,
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebrity;
