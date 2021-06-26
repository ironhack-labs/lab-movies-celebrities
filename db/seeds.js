require('dotenv/config')

require('./index')

const Mongoose = require("mongoose");

const Celebrity = require('./../models/Celebrity.model')

const celebrities = [

    {
        name: "Johannes Roberts",
        occupation: "The Strangers: Prey at Night",
        catchPhrase:
            "A family's road trip takes a dangerous turn when they arrive at a secluded mobile home park to stay with some relatives and find it mysteriously deserted. Under the cover of darkness, three masked psychopaths pay them a visit to test the family's every limit as they struggle to survive.",

    },
    {
        name: "Rob Cohen",
        occupation: "The Hurricane Heist",
        catchPhrase:
            "Thieves attempt a massive heist against the U.S. Treasury as a Category 5 hurricane approaches one of its Mint facilities.",

    },
    {
        name: "Nash Edgerton",
        occupation: "Gringo",
        catchPhrase:
            "GRINGO, a dark comedy mixed with white-knuckle action and dramatic intrigue, explores the battle of survival for businessman Harold Soyinka (David Oyelowo) when he finds himself crossing the line from law-abiding citizen to wanted criminal.",

    },
    {
        name: "Cory Finley",
        occupation: "Thoroughbreds",
        catchPhrase:
            "Two upper-class teenage girls in suburban Connecticut rekindle their unlikely friendship after years of growing apart. Together, they hatch a plan to solve both of their problems-no matter what the cost.",

    }
];

// Add here the script that will be run to actually seed the database (feel free to refer to the previous lesson)
Celebrity
    .create(celebrities)
    .then(theCelebrities => console.log(`Sono state create ${theCelebrities.length} celebrities`))
    .then(() => Mongoose.connection.close())
    .catch(error => console.log('C è stato un errore:', error))
  // ... your code here

