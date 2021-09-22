const Celebrity      =require("../models/Celebrity.model")


exports.Home = async(req,res)=>{

res.render("index")

}

exports.Create= async(req,res)=>{
    res.render("celebrities/new-celebrity")
}

exports.CreateFromForm= async(req,res)=>{
    //Destructuracion de objetos del req.body que obtenemos del forumlario
    const{name,occupation,catchPhrase}=req.body;
    //Creamos la nueva celebridad con el nombre,ocupacion y frase
    //AL ser los mismos nombres, las propiedades y el valor, no es necesario indicarlo
    const newCelebrity= await Celebrity.create({name,occupation,catchPhrase});
    console.log(newCelebrity);

    return res.redirect("/celebrities")

}

exports.list = async(req,res)=>{

    const dbCelebrities= await Celebrity.find()

    return res.render("celebrities/celebrities",{
        celebrityList:dbCelebrities
    })


}