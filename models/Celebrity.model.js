const mongoose = require('mongoose');

const REQUIRED_ERROR = 'Required field';

const celebritySchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: [true, REQUIRED_ERROR],
      },
      occupation: {
        type: String,
        required: [true, REQUIRED_ERROR],
      },
      catchPhrase: {
        type: String,
        required: [true, REQUIRED_ERROR],
      },
      
    
      
      }
  )
  
  // Model
  
  const Celebrity = mongoose.model('Celebrity', celebritySchema);
  
  module.exports = Celebrity;
