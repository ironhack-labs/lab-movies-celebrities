
//Router
const router = require("express").Router()

//Model
const Celebrity = require('../models/Celebrity.model')



//-----------GET ROUTES
router.get("/", async (req, res, next)=>{
    try{
    const celebrities = await Celebrity.find({})                
    res.render("./celebrities/celebrities", { celebrities })
    }catch(err){
        console.log('Error: ', err)
    }
    
})

router.get("/create", (req, res, next)=>{
    res.render('./celebrities/new-celebrity')
})






//-----------POST ROUTES
router.post("/create", async(req, res)=>{
    const{name, occupation, catchPhrase} = req.body
    try{
        const newCelebrity = await Celebrity.create({name, occupation, catchPhrase})
        res.render('./celebrities/celebrities')
    }catch(err){
        console.log('Error:', err)
        res.render('./celebrities/newCelebrity')
    }
})

module.exports = router