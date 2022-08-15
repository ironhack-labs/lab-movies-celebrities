//  Add your code here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebSchema = new Schema({
    
    name: {type: String},
    occupation: {type: String},
    catchphrase: {type: String}

  });

  const celeb = mongoose.model('celeb', celebSchema);

  module.exports = celeb;