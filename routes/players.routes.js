const router = require("express").Router();
const Player = require('../models/Players.model')

router.get('/create', (req, res) => res.render('players/new-player'))

router.post('/create', (req, res) => {

  const { name, nationality, catchPhrase } = req.body

  Player
    .create({ name, nationality, catchPhrase })
    .then(() => res.redirect('/players/list'))
    .catch(err => console.log('An has ocurred when creating a new player', err))
})

router.get('/list', (req, res) => {

    Player
      .find()
      .select('name')
      .then(players => res.render('players/players-list', { players }))
      .catch(err => console.log(err))
  })


module.exports = router;
