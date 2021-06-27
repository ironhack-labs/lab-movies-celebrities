const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')



// router.get('/', (req, res, next) => {
//     res.render("index");
// })

exports.celebrity_create = (req, res) => res.render('celebrities/new-celebrity')

// router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'))

// // //res.send(console.log('holi'))

// router.post('/celebrities/create', (req, res) => {

//     const { name, occupation, catchPhrase } = req.body

//     Book
//         .create({ name, occupation, catchPhrase })
//         .then(() => res.redirect('/celebrities'))
//         .catch(err => console.log(err))
// })













module.exports = router