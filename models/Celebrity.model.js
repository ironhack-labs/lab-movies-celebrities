const mongoose = require("mongoose");

const celeb_schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  occupation: {
    type: String,
    require: true,
  },
  catchPhrase: {
    type: String,
  },
});

const Celeb = mongoose.model("celeb", celeb_schema);

module.exports = { Celeb };
