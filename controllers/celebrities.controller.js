const Celebrity = require('../models/Celebrity.model')

//READ

module.exports.list = (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('celebrities/list', { celebrities })
        })
        .catch(next)
}

//CREATE

module.exports.create = (req, res, next) => {
    console.log('test')
    res.render('celebrities/form')
}

module.exports.doCreate = (req, res, next) => {
    console.log('post')

    Celebrity.create(req.body)
        .then(createdCelebrity => {
            console.log(createdCelebrity)
            res.redirect('/celebrities')
        })
        .catch(err =>{
            console.error('Error: not created', err)
        })

}


//DELETE

module.exports.delete = (req, res, next) => {
    const { id } = req.params

    Celebrity.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(next)
}