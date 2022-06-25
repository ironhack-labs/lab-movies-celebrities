const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model');


router.get('/', (req, res) => {
    Celebrity.find()
        .then(data => res.render('celebrities/celebrities', { data }))
        .catch(err => console.log("Error loading celebs from the DB ", err));
});

router.get('/:id/details', (req, res) => {
    Celebrity.findById(req.params.id)
        .populate('movies', 'title')
        .then(celeb => {
            res.render('celebrities/celebrity-details', celeb);
        })
        .catch(err => console.log("Error loading the celeb", err));
});

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res) => {
    Celebrity.create(req.body)
        .then(res.redirect('/celebrities'))
        .catch(err => {
            res.redirect('/celebrities/create')
            console.log("Error adding the celeb to the DB", err);
        });
});

router.get('/:id/edit', (req, res) => {
    Celebrity.findById(req.params.id)
        .then(data => res.render('celebrities/edit-celebrity', data))
        .catch(err => console.log(err));
});

router.post('/:id/edit', (req, res) => {
    Celebrity.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.redirect(`/celebrities/${req.params.id}/details`))
        .catch(err => console.log(err));
});

router.post('/:id/delete', (req, res) => {

    const celebID = req.params.id;

    //Celebrity.findByIdAndDelete(celebID).then(res.redirect('/celebrities'));

    Celebrity.findById(celebID)
        .then(data => {
            if (data.movies.length > 0) {
                const filterParam = {
                    $or: []
                }
                data.movies.forEach(movieID => {
                    filterParam.$or.push({ _id: movieID });
                });

                return Movie.updateMany(filterParam, { $pull: { cast: celebID } });
            }

        })
        .then(() => Celebrity.findByIdAndDelete(celebID))
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err));

});

module.exports = router;
