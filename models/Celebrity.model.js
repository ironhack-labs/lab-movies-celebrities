//  Add your code here
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const celebSchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const Celeb = mongoose.model("Celeb", celebSchema);
module.exports = Celeb;

// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const authorSchema = new Schema({
//   name: String,
//   lastName: String,
//   nationality: String,
//   birthday: Date,
//   pictureUrl: String,
//   books: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Book",
//     },
//   ],
// });

// const Author = mongoose.model("Author", authorSchema);
// module.exports = Author;
