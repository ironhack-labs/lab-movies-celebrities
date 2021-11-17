//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema(
    {
        name: { type: String, required: true },
        occupation: { type: String, required: true },
        catchPhrase: { type: String, required: true }
    },
    {
        timestamps: {
          // https://mongoosejs.com/docs/guide.html#timestamps
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      }
);

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;