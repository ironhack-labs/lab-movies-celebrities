const Celebrity = require('../models/Celebrity.model')

exports.getCelebrities = async (req, res) => {
    try {
        const foundCelebs = await Celebrity.find({});
        console.log(foundCelebs);
        res.render('celebrities/list')
    } catch (error) {
        console.log(error);
    }
}

exports.create = (req, res) => {
    res.render('celebrities/new-celebrity');
}

exports.createForm = async (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    console.log(name, occupation, catchPhrase);
    try {
        await Celebrity.create({ name, occupation, catchPhrase });
        return res.redirect('/celebrities');
    } catch (error) {
        console.log(error);
        return res.redirect('celebrities/new-celebrity');
    }
    
}
