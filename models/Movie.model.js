const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const moviesSchema = new Schema(
  {
    title : {
      type: String,
    },
    genre  : {
      type: String, 
    },
    plot  : {
      type: String,
    },
    cast:[{
        type: Schema.Types.ObjectId,
        ref: "Celebrity",

    }
    ]
    },
);
module.exports = model ("Movies", moviesSchema);
