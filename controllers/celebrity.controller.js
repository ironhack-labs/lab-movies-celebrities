const { model } = require('mongoose');

const Celebrity = require('../models/Celebrity.model');

// Read
module.exports.list = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/list', { celebrities });
        })
        .catch(next)
};

module.exports.details = (req, res, next) => {
    const { id } = req.params;
    Celebrity.findById(id)
        .then((celebrity) => {
            res.render('celebrities/details', { celebrity });
        })
        .catch((err) => {
            console.error(err);
        })
};

// Create
module.exports.create = (req, res, next) => {
    res.render('celebrities/new');
}

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
        .then((createCelebrity) => {
            console.log(createCelebrity);
            res.redirect('/celebrities');
        })
        .catch((err) => {
            next(err);
        })
}

// Update
module.exports.edit = (req, res, next) => {
    const { id } = req.params;
    Celebrity.findById(id)
        .then((celebrity) => {
            console.log(celebrity)
            res.render('celebrities/update', { celebrity })
        })
}

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;
    Celebrity.findByIdAndUpdate(id, req.body, { new: true })
        .then((celebrity) => {
            console.log(celebrity);
            res.redirect(`/celebrities/${celebrity.id}`);
        })
}

// Delete
module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    Celebrity.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(next)
}