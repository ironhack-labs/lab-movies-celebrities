const Celebrity = require('../models/Celebrity.model')

exports.getCelebrities = async (req, res) => {
    try {
        const foundCelebs = await Celebrity.find({});
        console.log(foundCelebs);
        res.render('celebrities/list', {
            celebrities: foundCelebs
        })
    } catch (error) {
        console.log(error);
    }
}

exports.create = (req, res) => {
    res.render('celebrities/new-celebrity');
}

exports.createForm = async (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    try {
        await Celebrity.create({ name, occupation, catchPhrase });
        return res.redirect('/celebrities');
    } catch (error) {
        console.log(error);
        return
    }

}

exports.getCelebrity = async (req, res) => {
    const { id } = req.params;
    const foundCeleb = await Celebrity.findById(id);
    res.render('celebrities/celebrity-detail', {celeb: foundCeleb});
}

exports.editCelebrity = async (req, res) => {
    const { id } = req.params;
    const foundCelebrity = await Celebrity.findById(id);
    res.render('celebrities/edit-celebrity', {celebrity: foundCelebrity});
}

exports.editCelebrityForm = async (req, res) => {
    const { id } = req.params;
    const { name, occupation, catchPhrase } = req.body;
    const updateCelebrity = await Celebrity.findByIdAndUpdate(
        id,
        { name, occupation, catchPhrase },
        { new: true }
    )
    console.log(updateCelebrity);
    return res.redirect('/celebrities')
}

exports.deleteCelebrity = async (req, res) => {
    const { id } = req.params;
    await Celebrity.findByIdAndDelete(id);
    return res.redirect('/celebrities');
}
