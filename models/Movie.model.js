const {Schema, model} = require("mongoose");
//  Add your code here

const movieSchema = new Schema(
        {
        title: String,
        genre: String,
        plot: String,
        cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
    },
    {
        timestamps: true
    }

    
)

const Celebtrity = model("Celebrity", movieSchema);
module.exports = Celebtrity;