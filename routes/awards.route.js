const router = require('express').Router();
const MovieModel = require('../models/Movie.model');
const CelebrityModel = require('../models/Celebrity.model');
const AwardModel = require('../models/Award.model');

router.get('/awards', (req, res, next) => {
    AwardModel.find()
        .then((awards) => {
            res.render('awards/awards', {awards});
        }).catch((err) => {
            next(err);
        });
});

router.get('/awards/create', (req, res, next) => {
    CelebrityModel.find()
        .then((celebrities) => {
            MovieModel.find()
                .then((movies) => {
                    res.render('awards/new-award', {celebrities, movies});
                }).catch((err) => {
                    next(err);
                })
        }).catch((err) => {
            next(err);
        })
});

router.post('/awards/create', (req, res, next) => {
    const { name, movie, cast } = req.body;

    AwardModel.create({ name, movie, cast })
        .then(() => {
            res.redirect('/awards');
        }).catch((err) => {
            next(err);
        });
});

router.get('/awards/:id', (req, res, next) => {
    let id = req.params.id;

    AwardModel.findById(id)
        .populate('movie')
        .populate('cast')
        .then((award) => {
            res.render('awards/award-details', {award});
        }).catch((err) => {
            next(err);
        });
});

router.get('/awards/:id/edit', (req, res, next) => {
    let id = req.params.id;
    CelebrityModel.find()
        .then((celebrities) => {
            MovieModel.find()
                .then((movies) => {
                    AwardModel.findById(id)
                        .then((award) => {
                            res.render('awards/edit-award', {award, celebrities, movies});
                        }).catch((err) => {
                            next(err);
                        });
                }).catch((err) => {
                    next(err);
                });
        }).catch((err) => {
            next(err);
        });
});

router.post('/awards/:id/edit', (req, res) => {
    let id = req.params.id;
    const { name, movie, cast } = req.body;

    AwardModel.findByIdAndUpdate(id, { name, movie, cast })
        .then((award) => {
            res.redirect(`/awards/${award._id}`)
        }).catch((err) => {
            next(err);
        });
});

router.post('/awards/:id/delete', (req, res, next) => {
    let id = req.params.id;

    AwardModel.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/awards');
        }).catch((err) => {
            next(err);
        });
});

module.exports = router;