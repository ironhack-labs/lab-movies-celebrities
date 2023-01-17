const app = require('../app');

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');
// all your routes here

router.get('/', async (req, res, next) => {
  try {
    celebs = await Celebrity.find();
    // console.log(celeb)
    res.render('celebrities/celebrities', { celebs });
  } catch (err) {
    next(err);
  }
});

router.get('/create/:id?', async (req, res, next) => {
  console.log('Creating Celeb');
  try {
    const formData = {
      title: 'Add New Celebrity',
      action: '/celebrities/create',
      btnSubmit: 'Add Celebrity',
    };
    let celeb = {};

    if (req.params.id) {
      celeb = await Celebrity.findById(req.params.id);
      formData.title = 'Edit Celebrity';
      formData.action = `/celebrities/update/${celeb._id}`;
      formData.btnSubmit = 'Save Changes';
    }

    res.render('celebrities/new-celebrity', { celeb, formData });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const celeb = await Celebrity.findById(req.params.id);
    const movies = await Movie.find({ celebrity: celeb });
    console.log({ movies });
    res.render('celebrities/celebrity-details', { celeb, movies });
  } catch (err) {
    next(err);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    const data = await Celebrity.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/celebrities');
  } catch (err) {
    next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const data = await Celebrity.create(req.body);
    if (data) res.redirect('/celebrities');
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const data = await Celebrity.findByIdAndDelete(req.params.id);
    res.redirect('/celebrities');
  } catch (err) {
    next(err);
  }
});
module.exports = router;
