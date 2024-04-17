const express = require("express")
const router = express.Router()

const celebrities = require('../controllers/celebrities.controllers')
const movies = require('../controllers/movies.controllers')


//***routes celebrities */
router.get("/", (req, res, next) => res.render("home"));
router.get('/celebrities-list',celebrities.list)
router.get('/celebrities-create', celebrities.create)
router.post('/celebrities-create', celebrities.DoCreate)
//*****routes movies ******/
router.get('/movies-list', movies.list)
router.get('/movies-create', movies.create)
router.post('/movies-create', movies.doCreate)

router.get('/movies-details/:id', movies.details)

router.get('/movies-edit/:id/edit',movies.edit)
router.post('/movies-edit/:id/edit',movies.doEdit)

router.get("/movies-edit/:id/delete", movies.delete)

module.exports = router;