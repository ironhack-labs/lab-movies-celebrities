const Celebrity = require("./../models/Celebrity.model")

exports.getCelebrities = async (req, res) => {
    
    try {
        const foundCelebrities = await Celebrity.find({})

        res.render("celebrities/celebrities", {
            data: foundCelebrities
        })
        
    } catch (error) {

        console.log(error)

    }

};


exports.createCelebrity = async (req,res) => {
    return res.render("celebrities/new-celebrity")
};



exports.createCelebrityForm = async (req, res) => {

    const { name, occupation, catchPhrase } = req.body
    
    try {
        
        const NewCelebrity = await Celebrity.create({ name, occupation, catchPhrase })
        console.log(NewCelebrity)
        return res.redirect("/celebrities")
        

    } catch (error) {
        
        console.log(error)
    }
};