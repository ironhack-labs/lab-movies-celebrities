
const router = require("express").Router()
const Team = require('../models/Teams.model')
const Player = require('../models/Players.model')

router.get('/create', (req, res) => {

    Player
        .find()
        .then(players => res.render('teams/new-team', { players }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {

    const { name, nationality, ligue, founded, formerPlayers } = req.body

    Team
        .create({ name, nationality, ligue, founded, formerPlayers })
        .then(() => res.redirect('/teams/list'))
        .catch(err => console.log('An has ocurred when creating a new team', err))
})

router.get('/list', (req, res) => {

    Team
        .find()
        .select('name')
        .then(teams => res.render('teams/teams-list', { teams }))
        .catch(err => console.log('An has ocurred when listing all teams', err))
})

router.get('/details/:team_id', (req, res) => {

    const { team_id } = req.params

    Team
        .findById(team_id)
        .populate('formerPlayers')
        .then(team => res.render('teams/team-details', team))
        .catch(err => console.log('An has ocurred when showing team details', err))
})

router.get('/details/:team_id/delete', (req, res) => res.render('teams/teams-list'))

router.post('/details/:team_id/delete', (req, res) => {

    const { team_id } = req.params

    Team
        .findByIdAndRemove(team_id)
        .then(() => res.redirect('/teams/list'))
        .catch(err => console.log('An has ocurred when deleting a team', err))
})

router.get('/details/:team_id/edit', (req, res) => {

    const { team_id } = req.params

    Team
        .findById(team_id)
        .populate('formerPlayers')
        .then(team => res.render('edit-team', team))
        .catch(err => console.log('An has ocurred when shwoing player details', err))

})

router.post('/details/:team_id/edit', (req, res) => {

    const { team_id } = req.params
    const { name, nationality, ligue, founded, formerPlayers } = req.body

    Team
        .findByIdAndUpdate(team_id, { name, nationality, ligue, founded, formerPlayers })
        .then(() => res.redirect('/teams/list'))
        .catch(err => console.log('An has ocurred when editing a team', err))
})

module.exports = router
