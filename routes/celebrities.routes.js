const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/create", (req, res) => res.render("celebrities/new-celebrity"));

router.post("/create", async (req, res, next) => {
  try {
    await Celebrity.create(req.body)
    res.redirect('/celebrities')
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allCelebs = await Celebrity.find()
    res.render('celebrities/celebrities', { allCelebs })
  } catch (error) {
    next(error)
  }
})

router.get('/:celebID', async (req, res, next) => {
  try {
    const celeb = await Celebrity.findById(req.params.celebID)
    res.render('celebrities/celebrity-details', celeb)
  } catch (error) {
    next(error)
  }
})

router.post('/:celebID/delete', async (req, res, next) => {
  try {
    await Celebrity.findByIdAndRemove(req.params.celebID)
    res.redirect('/celebrities')
  } catch (error) {
    next(error)
  }
})

router.get('/:celebID/edit', async (req, res, next) => {
  try {
    const celeb = await Celebrity.findById(req.params.celebID)
    res.render('celebrities/edit-celeb', celeb)
  } catch (error) {
    next(error)
  }
})

router.post('/:celebID/edit', async (req, res, next) => {
  try {
    await Celebrity.findByIdAndUpdate(req.params.celebID, req.body)
    res.redirect(`/celebrities/${req.params.celebID}`)
  } catch (error) {
    next(error)
  }
})

module.exports = router;