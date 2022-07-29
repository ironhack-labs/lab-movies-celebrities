const mongoose = require('mongoose')

const MONGOOB_URI = process.env.MONGOOB_URI || 'mongodb://127.0.0.1:27017/celebrities'

mongoose
  .connect(MONGOOB_URI, {
      useNewUrlParser: true,  
      useUnifiedTopology: true,
  })
  .then((x)=>{
    console.log(`Connected to db at ${MONGOOB_URI}`)
  })
  .catch((err)=>{
    console.error(`Error connecting to db at ${MONGOOB_URI}`, err)
    process.exit(0)
  })
  
process.on("SIGINT", function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected")
    process.exit(0) 
  })
})