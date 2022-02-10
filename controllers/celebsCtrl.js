const Celeb = require('../models/Celebrity.model')
//C: crear celebridad
exports.newCeleb = async (req, res) => {
    res.render('celebrities/new-celebrity')
}
exports.newCelebForm = async (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    try {
        const cl = await Celeb.create({ name, occupation, catchPhrase })
        console.log(cl);
        res.redirect('/celebrities')
    } catch (error) {   
        console.log(error);
    }
}
//R: Leer celebridades

exports.getCelebs = async (req,res) => { 
    try {
        const foundCelebs = await Celeb.find({})
        res.render('celebrities/celebrities', { data: foundCelebs})     
    } catch (error) {
        console.log(error);
    }
}

//detalles de celebridad
exports.viewCeleb = async (req, res) => {
    const { celebID } = req.params;
    const getOneCeleb = await Celeb.findById(celebID);
    res.render('celebrities/celebrity-details', { celeb: getOneCeleb });
}

//U: editar celebridad
exports.editCeleb = async (req, res) => {
    const { celebID } = req.params;
    const getOneCeleb = await Celeb.findById(celebID);
    res.render('celebrities/edit-celebrity', { celeb: getOneCeleb });
}

exports.editCelebForm = async (req, res) => {
    const { celebID } = req.params;
    const { name, occupation, catchPhrase } = req.body;
    try {
        await Celeb.findByIdAndUpdate(celebID, { name, occupation, catchPhrase }, { new: true });
        return res.redirect('/celebrities')
    } catch (error) {
        console.log(error);
    }
}
//D: eliminar celebridad
exports.deleteCeleb = async (req, res) => {
    const { celebID } = req.params;
    await Celeb.findByIdAndDelete(celebID);
    res.redirect('/celebrities')
}