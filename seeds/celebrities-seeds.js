const mongoose = require ("mongoose");
const Cele = require("../models/Celebrity.model");
const DB_NAME ="mongodb://localhost/lab-movies-celebrities";


mongoose.connect(DB_NAME)

const celebrities = [
    { name: "Rianna", occupation:"Singer",catchPhrase:"Sing" },
    { name: "Shakira", occupation:"Singer",catchPhrase:"Sing" },
    { name: "Adeke", occupation:"Singer",catchPhrase:"Sing" },
  
  ];

  Cele.create(celebrities,err=>{
    if(err){
        throw err;
    }
    console.log(err)
    console.log (`Creamos ${celebrities.length} en celee model`)
    mongoose.connection.close()


  })