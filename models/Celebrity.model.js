const {mongoose,Schema,model} = require ("mongoose")





const celebritySchema = new Schema({
  name: String,
  occupation: String
  catchPhrase: String
});
const Celebrity = model('Celebrity', CelebritySchema);

module.exports = Celebrity;