//  Add your code here
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    // cast: [{
    //   type: mongoose.Types.ObjectId,
    //   ref: 'Celebrity',
    //   required: true
    // }]
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('Movie', MovieSchema);
