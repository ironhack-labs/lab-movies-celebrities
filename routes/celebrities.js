const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

/* GET celebrities page */

router.get("/celebrities", (req, res) => {
    res.render("./celebrities/celebrities");
});

router.get("/celebrities/create", (req, res) => {
    res.render("./celebrities/newCelebrity");
});

router.post("/celebrities/create", async (req, res) => {
    const {name, occupation, catchPhrase} = req.body
    console.log(req.body)
    try {
        const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase})
        if(createdCelebrity) {
            res.render("./celebrities/celebrities");
        }else {
            res.render("./celebrities/newCelebrity", {errMsg: "There is an error creating a new celebrity. Please try again"})
        }
    }catch (err) {
        console.log(err)
    }
    
});


module.exports = router;