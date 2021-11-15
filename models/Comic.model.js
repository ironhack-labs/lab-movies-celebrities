const { Schema, model } = require("mongoose");


const comicSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: 'Character' }]
  },
  {
    timestamps: true,
  }
);

const Comic = model("Comic", comicSchema);

module.exports = Comic;