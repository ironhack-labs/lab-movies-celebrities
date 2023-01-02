import { Schema, model } from "mongoose";

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Celebrity", celebritySchema);
