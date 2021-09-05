const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')

router.get('/create' , (req, res) => res.render('celebrities/new-celebrity'))

router.post('/create', (req, res) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity
        .create({name, occupation, catchPhrase})
        .then(() => res.redirect('/celebrities'))
        .catch(err => res.render('celebrities/new-celebrity'))
});

router.get('/', (req, res) => {
    Celebrity
        .find()
        .select('name occupation catchPhrase')
        .then((celebrities) => res.render('celebrities/celebrities', {celebrities}))
        .catch(err => console.log(err))
});

router.get("/:celebrityId", (req, res) => {
  Celebrity
    .findById(req.params.celebrityId)
    .then((celebrity) =>
      res.render('celebrities/celebrity-details', celebrity))
    .catch((err) => console.log(err))
});

router.post('/:celebrityId/delete', (req, res) => {
  Celebrity
    .findByIdAndRemove(req.params.celebrityId)
    .then(() => res.redirect('/celebrities'))
    .catch((err) => console.log(err));
});

router.get('/:celebrityId/edit', (req, res) => {
  Celebrity
    .findById(req.params.celebrityId)
    .then((celebrity) => {
      res.render('celebrities/edit-celebrity', celebrity);
    })
    .catch((err) => console.log(err))
});

router.post('/:celebrityId', (req, res) => {
  const {name, occupation, catchPhrase} = req.body;
  Celebrity
    .findByIdAndUpdate(req.params.celebrityId,{name, occupation, catchPhrase},{new:true})
    .then(() => res.redirect(`/celebrities/${req.params.celebrityId}`))
    .catch(() => res.redirect('/celebrities/:celebrityId/edit'));
});

module.exports = router;
