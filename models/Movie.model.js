const { Schema, model } = require("mongoose");

const moviesSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [
      {
        type: Schema.Types.ObjectId, // Tipo de dato, siempre Schema.Types.ObjectId
        ref: "Celebrities", // Nombre del modelo relacionado (NOMBRE)
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Movies", moviesSchema);
