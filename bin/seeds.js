require("../db")
const Celebrity = require("../models/Celebrity.model")

const celebrities = [
    {
        name: "Tom Cruise",
        occupation: "Actor",
        catchPhrase: "I want the truth!",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/440px-Tom_Cruise_by_Gage_Skidmore_2.jpg"
    },
    {
        name: "Tom Hanks",
        occupation: "Actor",
        catchPhrase: "My mama always said, 'Life was like a box of chocolates. You never know what you're gonna get.'",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT3mwYgOQ560Qg303QYp3MDSvLzqC6-jSXBpknN2Oqj7f9trZoJ"
    },
    {
        name: "Lady Gaga",
        occupation: "Singer",
        catchPhrase:"And you just need one to believe in you - and that was him.",
        image:"https://upload.wikimedia.org/wikipedia/commons/0/0e/Lady_Gaga_at_Joe_Biden%27s_inauguration_%28cropped_5%29.jpg"
    }
]

Celebrity.create(celebrities)
.then((celebrities)=>{
    console.log("Success, these celebrities were added", celebrities);
})
.catch(()=> {
    console.log("Opss, something went wrong :(")
})