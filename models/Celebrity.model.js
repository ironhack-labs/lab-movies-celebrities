//  Add your code here

const { Schema, model } = require("mongoose");

const celebSchema = new Schema({
	name: String,
	occupation: String,
	catchPhrase: String,
});

const Celeb = model("Celebrity", celebSchema);

module.exports = Celeb;
